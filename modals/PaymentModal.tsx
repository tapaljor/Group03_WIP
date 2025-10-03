// PaymentModal.tsx
import React, { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform, Linking } from "react-native";
import { WebView } from "react-native-webview";
import { Item } from "../models/ItemDoc";
import { styles } from "../g03CSS";
import { collection, doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../config/firebaseConfig";
import { userAuthentication } from "../config/userAuthentication";

type Props = {
    itemDetail: Item;
    visible: boolean;
    onClose: () => void;
};

const BASE_URL = Platform.select({
    ios: "http://localhost:3000",     // iOS Simulator
    android: "http://10.0.2.2:3000",  // Android Emulator
}) as string;

// These should match what you set on the server (can be https pages you control)
const SUCCESS_URL = "https://example.com/success";
const CANCEL_URL = "https://example.com/cancel";
const collectionName = "itemList"

export default function PaymentModal({ itemDetail, visible, onClose }: Props) {
    const { user } = userAuthentication()
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Create a Checkout Session when modal opens
    useEffect(() => {
        if (!visible) return;
        (async () => {
            try {
                setLoading(true);
                const name = itemDetail?.title || "Item";
                const amount = Math.round((Number(itemDetail?.price) || 0) * 100); // dollars -> cents
                if (!amount || amount <= 0) {
                    Alert.alert("Payment", "Price is missing or invalid.");
                    return;
                }
                const res = await fetch(`${BASE_URL}/checkout`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name, amount, currency: "cad", quantity: 1,
                        // Optional: override success/cancel on a per-session basis
                        // success_url: SUCCESS_URL, cancel_url: CANCEL_URL
                    }),
                });
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`HTTP ${res.status} — ${text || "No body"}`);
                }
                const { url, error } = await res.json();
                if (error) throw new Error(error);
                if (!url) throw new Error("Server did not return a checkout URL.");
                setCheckoutUrl(url);
            } catch (e: any) {
                Alert.alert("Payment error", e?.message ?? "Failed");
            } finally {
                setLoading(false);
            }
        })();
    }, [visible, itemDetail])

    const updateSold = async () => {
        if (!itemDetail.id) return 
        await updateDoc(
            doc(FirebaseDB, collectionName, itemDetail.id),
            {
                isSold: true,
                buyerID: user?.uid,
                buyerName: user?.displayName,
                soldDate: Date.now()
            }, { merge: true }
        )
    }

    // Intercept success/cancel and close modal
    const handleNavChange = (navState: any) => {
        const { url } = navState;
        if (!url) return;
        if (url.startsWith(SUCCESS_URL)) {
            Alert.alert("Success", "Payment complete!");
            updateSold()
            setCheckoutUrl(null);
            onClose();
        } else if (url.startsWith(CANCEL_URL)) {
            // Optional: handle cancel explicitly
            setCheckoutUrl(null);
            onClose();
        }
        // If you use a custom scheme like "yourapp://", intercept and open externally:
        // if (url.startsWith("yourapp://")) { Linking.openURL(url); onClose(); }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modal}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
                    <Text style={{ fontWeight: "700" }}>{itemDetail?.title}</Text>
                    <TouchableOpacity onPress={() => { setCheckoutUrl(null); onClose(); }}>
                        <Text style={{ color: "red" }}>Close</Text>
                    </TouchableOpacity>
                </View>

                {loading && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator />
                        <Text style={{ marginTop: 8 }}>Preparing checkout…</Text>
                    </View>
                )}

                {!loading && checkoutUrl && (
                    <WebView
                        source={{ uri: checkoutUrl }}     // Stripe HTTPS URL
                        startInLoadingState
                        onNavigationStateChange={handleNavChange}
                        // Some providers need JS & storage
                        javaScriptEnabled
                        domStorageEnabled
                    // iOS blocks HTTP; but Stripe is HTTPS. If your success_url is custom scheme, intercept above.
                    // For debugging SSL issues:
                    // onError={({ nativeEvent }) => Alert.alert("WebView error", nativeEvent.description)}
                    />
                )}
            </View>
        </Modal>
    )
}

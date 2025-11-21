import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, Alert, Platform, TextInput } from "react-native";
import { Item } from "../models/ItemDoc";
import { styles } from "../g03CSS";
import { doc, updateDoc } from "firebase/firestore";
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

const collectionName = "itemList";

export default function ReturnModal({ itemDetail, visible, onClose }: Props) {
    const { user } = userAuthentication();
    const [reason, setReason] = useState<string>("");

    const updateReturn = async () => {
        if (!itemDetail.id) return;
        await updateDoc(
            doc(FirebaseDB, collectionName, itemDetail.id),
            {
                isSold: false,
                buyerID: "",
                buyerName: "",
                soldDate: null,                 // or keep old soldDate, up to you
                checkoutSessionId: "",
                returned: true,                 // optional flag
                returnedAt: Date.now(),
                returnReason: reason || "",     // store reason too
                returnedBy: user?.uid ?? null,
            },
            { merge: true }
        );
    };

    const handleReturn = async () => {
        try {
            if (!itemDetail.checkoutSessionId) {
                Alert.alert("Return", "No Stripe session linked for this item.");
                return;
            }

            const res = await fetch(`${BASE_URL}/refund`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId: itemDetail.checkoutSessionId }),
            });

            const data = await res.json();
            if (!res.ok || !data.ok) {
                throw new Error(data.error || "Refund failed");
            }

            // 1. Update Firestore
            await updateReturn();

            // 2. Inform user and close modal
            Alert.alert("Return", "Refund processed successfully.", [
                {
                    text: "OK",
                    onPress: () => {
                        onClose();
                    },
                },
            ]);
        } catch (e: any) {
            Alert.alert("Return error", e?.message || "Could not process refund.");
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modal}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
                    <Text style={{ fontWeight: "700" }}>{itemDetail?.title}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: "red" }}>Close</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ padding: 12 }}>
                    <TextInput
                        value={reason}
                        onChangeText={setReason}
                        style={styles.inputStyle}
                        placeholder="Reason to return."
                        multiline
                    />

                    <TouchableOpacity
                        onPress={handleReturn}
                        style={[styles.buttonStyle, { marginTop: 12 }]}
                    >
                        <Text>Complete Return</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

// AddImageModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import {
    getStorage, ref, uploadBytesResumable, getDownloadURL, uploadString 
} from "firebase/storage";

type Props = {
    visible: boolean;
    onClose: () => void;
    onAddUrl: (url: string) => void;
}
export default function AddImageModal({ visible, onClose, onAddUrl }: Props) {
    const [busy, setBusy] = useState(false);
    const storage = getStorage();

    // Cross-version shim: MediaType (SDK ≥52) OR MediaTypeOptions (older)
    const MediaType: any = (ImagePicker as any).MediaType ?? (ImagePicker as any).MediaTypeOptions;

    const pickAndUpload = async (from: "camera" | "library") => {
        try {
            setBusy(true);
            if (from === "camera") {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== "granted") throw new Error("Camera permission required");
                const r = await ImagePicker.launchCameraAsync({ quality: 0.85, mediaTypes: MediaType.Images });
                if (r.canceled) return setBusy(false);
                await handleUpload(r.assets[0].uri);
            } else {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") throw new Error("Photos permission required");
                const r = await ImagePicker.launchImageLibraryAsync({ quality: 0.85, mediaTypes: MediaType.Images });
                if (r.canceled) return setBusy(false);
                await handleUpload(r.assets[0].uri);
            }
            setBusy(false); onClose();
        } catch (e: any) {
            console.error("upload error", e);
            setBusy(false); Alert.alert("Upload failed", e?.message ?? "Try again.");
        }
    };
    const handleUpload = async (localUri: string) => {
        // compress to avoid timeouts
        const m = await ImageManipulator.manipulateAsync(localUri, [{ resize: { width: 1600 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG });
        const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const objectRef = ref(storage, `uploads/${name}`);

        // try resumable blob; fallback to base64 if blob fetch fails
        try {
            const blob = await (await fetch(m.uri)).blob();
            await new Promise<void>((ok, fail) => {
                const task = uploadBytesResumable(objectRef, blob, {
                    contentType: "image/jpeg", cacheControl: "public,max-age=31536000",
                });
                task.on("state_changed", undefined, fail, ok);
            });
        } catch {
            const base64 = await FileSystem.readAsStringAsync(m.uri, { encoding: FileSystem.EncodingType.Base64 });
            await uploadString(objectRef, base64, "base64", {
                contentType: "image/jpeg", cacheControl: "public,max-age=31536000",
            });
        }

        const url = await getDownloadURL(objectRef);
        onAddUrl(url);
    };

    return (
        <Modal transparent visible={visible} animationType="slide" onRequestClose={() => !busy && onClose()}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 14, width: "85%", gap: 12 }}>
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>Add Image</Text>
                    <TouchableOpacity disabled={busy} onPress={() => pickAndUpload("camera")}><Text style={{ padding: 12, color: busy ? "#aaa" : "#0a7" }}>Take Photo</Text></TouchableOpacity>
                    <TouchableOpacity disabled={busy} onPress={() => pickAndUpload("library")}><Text style={{ padding: 12, color: busy ? "#aaa" : "#06c" }}>Choose from Library</Text></TouchableOpacity>
                    <TouchableOpacity disabled={busy} onPress={onClose}><Text style={{ padding: 12, color: busy ? "#ccc" : "#999" }}>Cancel</Text></TouchableOpacity>
                    {busy && <View style={{ alignItems: "center", paddingTop: 6 }}><ActivityIndicator /><Text style={{ color: "#666", marginTop: 6 }}>Uploading…</Text></View>}
                </View>
            </View>
        </Modal>
    );
}

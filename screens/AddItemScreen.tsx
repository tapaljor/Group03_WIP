// src/screens/AddItemScreen.tsx
import React, { useMemo, useState } from "react";
import {
    TextInput,
    Text,
    TouchableOpacity,
    View,
    Alert,
    ScrollView,
    Modal,
} from "react-native";
import { styles } from "../g03CSS";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseDB } from "../config/firebaseConfig";
import { Dropdown } from "react-native-element-dropdown";
import { userAuthentication } from "../config/userAuthentication";
import { useNavigation } from "@react-navigation/native";

import {
    Item,
    ElectronicBrand,
    ElectronicType,
    ItemCondition,
} from "../models/ItemDoc";

const collectionName = "itemList";

const AddItemScreen = () => {
    const navigation = useNavigation();
    const { user } = userAuthentication();

    // ======== Item fields ========
    const [title, setTitle] = useState<string>("");
    const [brand, setBrand] = useState<ElectronicBrand | "">("");
    const [type, setType] = useState<ElectronicType | "">("");
    const [condition, setCondition] = useState<ItemCondition | "">("");
    const sellerID = user?.uid;
    const sellerName = user?.displayName;
    const [description, setDescription] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [images, setImages] = useState<string[]>([
        "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]);

    // ======== Modal to add image URL ========
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState("");

    // ======== Dropdown data (built from enums) ========
    const brandOptions = useMemo(
        () => Object.values(ElectronicBrand).map((b) => ({ label: b, value: b })),
        []
    );
    const typeOptions = useMemo(
        () => Object.values(ElectronicType).map((t) => ({ label: t, value: t })),
        []
    );
    const conditionOptions = useMemo(
        () => Object.values(ItemCondition).map((c) => ({ label: c, value: c })),
        []
    );

    // ======== Validation ========
    const validate = () => {
        if (!title.trim()) return "Title is required.";
        if (!brand) return "Brand is required.";
        if (!type) return "Type is required.";
        if (!condition) return "Condition is required.";
        const p = Number(price);
        if (Number.isNaN(p) || p <= 0) return "Enter a valid price.";
        if (images.length === 0) return "At least one image URL is required.";
        return null;
    };

    // ======== Submit ========
    const addNewItem = async () => {
        const error = validate();
        if (error) {
            Alert.alert("Error", error);
            return;
        }

        try {
            const payload: Omit<Item, "id"> = {
                title: title.trim(),
                brand: brand as ElectronicBrand,
                type: type as ElectronicType,
                condition: condition as ItemCondition,
                sellerID: user?.uid as string,
                sellerName: user?.displayName as string,
                description: description.trim(),
                address: address.trim(),
                price: Number(price),
                postDate: Date.now(),
                images: images.map((u) => u.trim()).filter(Boolean),
            };

            const ref = collection(FirebaseDB, collectionName);
            await addDoc(ref, payload);

            Alert.alert("Success", `Item "${payload.title}" added.`);
            navigation.goBack();
        } catch (e: any) {
            console.error(e);
            Alert.alert("Error", e?.message ?? "Failed to add item.");
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <TextInput
                    style={styles.inputStyle}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Title"
                    autoCapitalize="sentences"
                />
                <View style={styles.dropdown}>
                    <Dropdown
                        data={brandOptions}
                        value={brand}
                        onChange={(item: any) => setBrand(item.value as ElectronicBrand)}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Brand"
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.dropdown}>
                    <Dropdown
                        data={typeOptions}
                        value={type}
                        onChange={(item: any) => setType(item.value as ElectronicType)}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Type"
                        style={styles.inputStyle}
                    />
                </View>
                <View style={styles.dropdown}>
                    <Dropdown
                        data={conditionOptions}
                        value={condition}
                        onChange={(item: any) => setCondition(item.value as ItemCondition)}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Condition"
                        style={styles.inputStyle}
                    />
                </View>
                <View style={{ width: "100%", gap: 15 }}>
                    <TextInput
                        style={styles.textBox}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Pickup/meetup address.."
                    />
                </View>
                <TextInput
                    style={styles.inputStyle}
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="number-pad"
                    placeholder="Price"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.textBox}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Description.."
                    multiline
                />
                {/* Images list (readonly display) */}
                {images.map((url, index) => (
                    <View key={index} style={styles.vehicleRegister}>
                        <Text>Image {index + 1}</Text>
                        <TextInput style={styles.registerInput} value={url} editable={false} />
                    </View>
                ))}

                {/* Add image button */}
                <TouchableOpacity
                    style={[styles.buttonStyle, { backgroundColor: "#f0f0f0" }]}
                    onPress={() => {
                        setNewImageUrl("");
                        setIsModalVisible(true);
                    }}
                >
                    <Text style={styles.buttonText}>+ Add Image</Text>
                </TouchableOpacity>

                {/* Submit */}
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={addNewItem}>
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Add Image Modal */}
            <Modal
                transparent
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 15,
                            width: "80%",
                        }}
                    >
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={{ paddingVertical: 10, color: "red" }}>Close</Text>
                        </TouchableOpacity>
                        <Text style={{ marginBottom: 10 }}>Enter Image URL:</Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder="https://example.com/image.jpg"
                            value={newImageUrl}
                            onChangeText={setNewImageUrl}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={[styles.buttonStyle, { marginTop: 10 }]}
                            onPress={() => {
                                const trimmed = newImageUrl.trim();
                                if (trimmed) {
                                    setImages((prev) => [...prev, trimmed]);
                                    setIsModalVisible(false);
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default AddItemScreen

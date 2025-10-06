import React, { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Text,
    Alert,
    Dimensions,
    Platform,
} from "react-native";
import { styles } from "../g03CSS";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FirebaseDB } from "../config/firebaseConfig";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { Item } from "../models/ItemDoc";
import DisplayImages from "../components/DisplayImages";

type Route = RouteProp<RootStackParamList, "EditItemScreen">;
const collectionName = "itemList"

const EditItemScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<Route>();

    const { itemDetail } = route.params;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState("")
    const [address, setAddress] = useState("")
    const [images, setImages] = useState<string[]>([]);

    // Modal (add image)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState("");

    useEffect(() => {
        setTitle(itemDetail.title);
        setDescription(itemDetail.description);
        setPrice(itemDetail.price.toString());
        setAddress(itemDetail.address)
        setImages(Array.isArray(itemDetail.images) ? itemDetail.images : []);
    }, [itemDetail]);

    const validate = () => {
        if (!title.trim()) return "Title is required.";
        // seller fields might be non-editable in your flow, but we keep basic checks:
        return null;
    };

    const updateItem = async () => {
        const error = validate();
        if (error) {
            Alert.alert("Error", error);
            return;
        }
        try {
            const updated: Partial<Item> = {
                title: title.trim(),
                description: description.trim(),
                price: Number(price),
                address: address.trim(),
                images: Array.isArray(images) ? images : [],
            };
            const ref = doc(FirebaseDB, collectionName, itemDetail.id);
            await updateDoc(ref, updated);

            Alert.alert(`${title} updated successfully.`);
            navigation.navigate("DashboardScreen");
        } catch (e: any) {
            console.error("Error updating item:", e);
            Alert.alert("Update failed", e?.message ?? "Unknown error");
        }
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Image carousel */}
                <DisplayImages images={images} />
                <View style={[styles.detail, { width: "100%" }]}>
                    <Text>Title</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={title}
                        onChangeText={setTitle}
                        autoCapitalize="words"
                    />
                    <Text>Price</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="number-pad"
                    />
                    <Text>Address</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={address}
                        onChangeText={setAddress}
                    />
                    <Text>Description</Text>
                    <TextInput
                        style={styles.inputStyle}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Description.."
                        multiline
                    />
                    <Text>Images</Text>
                    {/* Image URL editors */}
                    {Array.isArray(images) &&
                        images.map((url, index) => (
                            <View key={index} style={styles.vehicleRegister}>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={url}
                                    onChangeText={(text) => {
                                        const next = [...images];
                                        next[index] = text;
                                        setImages(next);
                                    }}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </View>
                        ))}
                    <TouchableOpacity
                        style={[styles.buttonStyle, { backgroundColor: "#f0f0f0" }]}
                        onPress={() => {
                            setNewImageUrl("");
                            setIsModalVisible(true);
                        }}
                    >
                        <Text style={styles.buttonText}>+ Add Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={updateItem}>
                        <Text style={styles.buttonText}>Update Item</Text>
                    </TouchableOpacity>
                </View>
                {/* Add Image Modal */}
                < Modal
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
                                        setImages([...(images ?? []), trimmed]);
                                        setIsModalVisible(false);
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal >
            </ScrollView>
        </>
    )
}

export default EditItemScreen

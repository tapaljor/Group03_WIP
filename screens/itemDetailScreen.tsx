import { Modal, Linking, Platform, ScrollView, View, Image, TouchableOpacity, Text, Dimensions, Alert } from 'react-native';
import { styles } from '../g03CSS';
import { useEffect, useState } from 'react';
import { userAuthentication } from '../config/userAuthentication';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MapModal from "../modals/MapModal";
import PaymentModal from "../modals/PaymentModal";
import { Item } from '../models/ItemDoc';
import { FirebaseDB } from '../config/firebaseConfig';
import { deleteDoc, doc } from 'firebase/firestore';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ymd } from '../utils/ymd';
import { FontAwesome6 } from '@expo/vector-icons';
import DisplayImages from "../components/DisplayImages";

const collectionName = "itemList"
type Route = RouteProp<RootStackParamList, "ItemDetailScreen"> 
type Nav = NativeStackNavigationProp<RootStackParamList>

const ItemDetailScreen = () => {

    const route = useRoute<Route>()
    const { user } = userAuthentication()
    const navigation = useNavigation<Nav>()
    const { itemDetail }: { itemDetail: Item } = route.params
    const [address, setAddress] = useState("")
    const [showMap, setShowMap] = useState(false);
    const [buyVisible, setBuyVisible] = useState(false);

    useEffect(() => {
        setAddress(itemDetail.address)
    }, []);

    const deleteItem = () => {
        Alert.alert(
            "Confirm Delete",
            `Are you sure you want to delete ${itemDetail.brand} / ${itemDetail.type}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const toDelete = doc(FirebaseDB, collectionName, itemDetail.id);
                            await deleteDoc(toDelete);
                            Alert.alert("Deleted", `${itemDetail.brand} / ${itemDetail.type} deleted.`);
                            navigation.navigate("DashboardScreen")
                        } catch (error) {
                            console.log(`Error deleting ${itemDetail.brand} / ${itemDetail.type}`, error);
                        }
                    }
                }
            ]
        )
    }
    return (
        <>
            <ScrollView contentContainerStyle={styles.container} >
                <DisplayImages images={itemDetail.images} />
                <View style={styles.detail}>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Title</Text>
                        <Text>{itemDetail.title}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Brand</Text>
                        <Text>{itemDetail.brand}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Type</Text>
                        <Text>{itemDetail.type}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Condition</Text>
                        <Text>{itemDetail.condition}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Address</Text>
                        <Text>{itemDetail.address}</Text>
                        <TouchableOpacity
                            onPress={() => setShowMap(true)}
                        >
                            <FontAwesome6 name="location-dot" size={20} color="red" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Price</Text>
                        <Text>${itemDetail.price}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Seller</Text>
                        <Text>{itemDetail.sellerName}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Description</Text>
                        <Text>{itemDetail.description}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={{ fontWeight: "bold" }}>Posted On</Text>
                        <Text>{ymd(itemDetail.postDate ?? 0)}</Text>
                    </View>
                    {
                        itemDetail.isSold && (
                            <>
                                <View style={styles.detailItem}>
                                    <Text style={{ fontWeight: "bold" }}>Sold On</Text>
                                    <Text>{ymd(itemDetail.soldDate ?? 0)}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={{ fontWeight: "bold" }}>Sold to</Text>
                                    <Text>{itemDetail.buyerName}</Text>
                                </View>
                            </>
                        )
                    }
                </View>
                {
                    user?.uid === itemDetail.sellerID && (
                        <>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={() => navigation.navigate("EditItemScreen", { itemDetail })}
                            >
                                <Text>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                onPress={deleteItem}
                            >
                                <Text style={{ color: "red" }}>Delete</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
                {
                    itemDetail.sellerID !== user?.uid &&
                    !itemDetail.isSold && (
                        <>
                            <TouchableOpacity
                                onPress={() => setBuyVisible(true)}
                                style={styles.buttonStyle}
                            >
                                <Text>Buy</Text>
                            </TouchableOpacity>
                        </>
                    )
                }
            </ScrollView >
            <PaymentModal
                visible={buyVisible}
                onClose={() => setBuyVisible(false)}
                itemDetail={itemDetail}
            />
            <MapModal
                visible={showMap}
                onClose={() => setShowMap(false)}
                address={address}
            />
        </>
    )
}

export default ItemDetailScreen 

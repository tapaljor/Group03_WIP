import { Alert, Image, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { FirebaseDB } from '../config/firebaseConfig';
import { userAuthentication } from '../config/userAuthentication';
import { styles } from '../g03CSS';
import { Item } from '../models/ItemDoc';
import { collection, onSnapshot } from 'firebase/firestore';
import { FontAwesome6 } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ElectronicBrand, ElectronicType } from '../models/ItemDoc';
import { Dropdown } from 'react-native-element-dropdown';

const collectionName = "itemList"
type Nav = NativeStackNavigationProp<RootStackParamList>

const DashboardScreen = () => {
    const navigation = useNavigation<Nav>()
    const { user } = userAuthentication();
    const [itemList, setItemList] = useState<Item[]>([])
    const [brand, setBrand] = useState<ElectronicBrand | "">(ElectronicBrand.All)
    const [type, setType] = useState<ElectronicType | "">(ElectronicType.All)

    const brandOptions = useMemo(
        () => Object.values(ElectronicBrand).map((b) => ({ label: b, value: b })),
        []
    )
    const typeOptions = useMemo(
        () => Object.values(ElectronicType).map((t) => ({ label: t, value: t })),
        []
    )
    const filteredList = useMemo(() => {
        return (itemList ?? []).filter((item) =>
            (brand === "All" || item.brand === brand) && 
            (type === "All" || item.type === type) 
        )
    }, [itemList, brand, type])
    useEffect(() => {
        const collectionRef = collection(FirebaseDB, collectionName)
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            setItemList((prevList) => {
                let updatedList = [...prevList]

                snapshot.docChanges().forEach((change) => {
                    const data = {
                        ...change.doc.data(),
                        id: change.doc.id
                    } as Item
                    if (change.type === "added") {
                        if (!updatedList.some((v) => v.id === data.id)) {
                            updatedList.push(data)
                        } // to avoid duplicat push
                    } else if (change.type === "modified") {
                        updatedList = updatedList.map((v) =>
                            v.id === data.id ? data : v
                        ) // to make sure data is there in array
                    } else if (change.type === "removed") {
                        updatedList = updatedList.filter((v) =>
                            v.id !== data.id)
                        // update exluding deleted
                    }
                })
                return updatedList
            })
        })
        return () => unsubscribe()
    }, [])
    const getDetail = (item: Item) => {
        navigation.navigate("ItemDetailScreen", { itemDetail: item })
    }
    const ListItem = ({ item }: { item: Item }) => (
        <TouchableOpacity
            style={{ borderRadius: 10 }}
            onPress={() => getDetail(item)}
        >
            <View style={styles.mainView}>
                <View style={styles.subView}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text>${item.price}</Text>
                </View>
                <View style={styles.subView}>
                    <Text numberOfLines={1}>{item.brand} / {item.type} / {item.condition.toLocaleUpperCase()} </Text>
                    <Text
                        style={{ color: item.isSold ? "red" : "green" }}>
                        {item.isSold ? "Sold" : "Available"}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    const itemSeparator = () => (
        <View style={{ height: 10 }} />
    )
    if (itemList.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Not list yet.</Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", gap: 15 }}>
                <View style={[styles.dropdown, { width: "45%" }]}>
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
                <View style={[styles.dropdown, { width: "45%" }]}>
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
            </View>
            <FlatList
                style={{ width: "100%" }}
                keyExtractor={(item) => item.id}
                data={filteredList}
                renderItem={
                    ({ item }) => <ListItem item={item} />
                }
                ItemSeparatorComponent={itemSeparator}
            />
        </View>
    )
}

export default DashboardScreen

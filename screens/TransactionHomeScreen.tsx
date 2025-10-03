import { Alert, Image, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FirebaseDB } from '../config/firebaseConfig';
import { userAuthentication } from '../config/userAuthentication';
import { styles } from '../g03CSS';
import { Item } from '../models/ItemDoc';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { ymd } from '../utils/ymd';

const collectionName = "itemList"
type Nav = NativeStackNavigationProp<RootStackParamList>

const TransactionHomeScreen = () => {
    const navigation = useNavigation<Nav>()
    const { user } = userAuthentication();
    const [itemList, setItemList] = useState<Item[]>([])

    useEffect(() => {
        if (!user?.uid) return

        const colRef = collection(FirebaseDB, collectionName)
        const q = query(colRef, where("buyerID", "==", user?.uid))
        const unsubscribe = onSnapshot(q, (snap) => {
            const rows = snap.docs.map((d) => ({
                id: d.id, ...(d.data() as any)
            })) as Item[]
            setItemList(rows)
        },
            (err) => console.error("Canot fetch list", err)
        )
        return () => unsubscribe()
    }, [user?.uid])
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
                    <Text style={{ fontWeight: "bold" }} numberOfLines={1}>{item.title}</Text>
                    <Text>${item.price}</Text>
                </View>
                <View style={styles.subView}>
                    <Text numberOfLines={1}>{item.brand} / {item.type} </Text>
                    <Text style={{fontStyle: "italic"}}>{ymd(item.soldDate)}</Text>
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
            <FlatList
                style={{ width: "100%" }}
                keyExtractor={(item) => item.id}
                data={itemList}
                renderItem={
                    ({ item }) => <ListItem item={item} />
                }
                ItemSeparatorComponent={itemSeparator}
            />
        </View>
    )
}

export default TransactionHomeScreen 

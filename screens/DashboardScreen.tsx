import { Alert, Image, TouchableOpacity, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FirebaseDB } from '../config/firebaseConfig';
import { userAuthentication } from '../config/userAuthentication';
import { styles } from '../g03CSS';
import { Item } from '../models/ItemDoc';
import { collection, onSnapshot } from 'firebase/firestore';
import { FontAwesome6 } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const collectionName = "itemList"
type Nav = NativeStackNavigationProp<RootStackParamList>

const DashboardScreen = () => {
    const navigation = useNavigation<Nav>()
    const { user } = userAuthentication();
    const [itemList, setItemList] = useState<Item[]>([])

    useEffect(() => {
        const collectionRef = collection(FirebaseDB, collectionName)
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            setItemList((prevList) => {
                let updatedList = [...prevList]

                snapshot.docChanges().forEach((change) => {
                    const data = {
                        ...change.doc.data(),
                        id: change.doc.id
                    }
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
                    <Text style={{ fontWeight: "bold" }}>{item.brand} / {item.type}</Text>
                    <Text>${item.price}</Text>
                </View>
                <View style={styles.subView}>
                    <Text>{item.condition.toLocaleUpperCase()} </Text>
                    <Text 
                        style={{ color: item.isSold ? "red": "green"}}> 
                        { item.isSold ? "Sold" : "Available"}
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

export default DashboardScreen

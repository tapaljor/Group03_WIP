import { Text, Image, TouchableOpacity, View, Alert, Vibration } from 'react-native';
import { useEffect, useState } from 'react';
import { FirebaseAuth, FirebaseDB } from '../config/firebaseConfig';
import { userAuthentication } from '../config/userAuthentication';
import { styles } from '../g03CSS';
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { UserDoc } from '../models/UserDoc';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';

type Nav = NativeStackNavigationProp<RootStackParamList>
const collectionName = 'userList'

const ProfileScreen = () => {
    const navigation = useNavigation<Nav>()
    const { user } = userAuthentication()
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<UserDoc | null>(null)

    useEffect(() => {
        getUserProfile()
    }, [user?.uid])
    const getUserProfile = async () => {
        try {
            if (!user?.uid) {
                setLoading(false)
                return
            }
            const collectionRef = collection(FirebaseDB, collectionName)
            const docRef = doc(collectionRef, user?.uid)
            const snap = await getDoc(docRef)
            if (snap.exists()) {
                const data = snap.data() as UserDoc
                setProfile(data)
            } else {
                console.log(`No profile found.`)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading..</Text>
            </View>
        )
    }
    return (
        <View style={styles.detail}>
            <Text style={styles.header}>Profile</Text>
            <View style={styles.detailItem}>
                <Text>Name</Text>
                <Text style={{ fontWeight: "bold", }}>{user?.displayName}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text>Email</Text>
                <Text style={{ fontWeight: "bold", }}>{user?.email}</Text>
            </View>
            <TouchableOpacity 
            style={ styles.buttonStyle}
            onPress={async() => {
                if (!user?.email) return
                 await sendPasswordResetEmail(FirebaseAuth, user?.email)
                Alert.alert(`Email reset linke is sent to ${user?.email}`)
            }}  
            >

                <Text>Reset Password</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen 

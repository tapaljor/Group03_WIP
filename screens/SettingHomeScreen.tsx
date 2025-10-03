import { View, Text, TouchableOpacity, Vibration, Alert } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { styles } from '../g03CSS';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import ProfileScreen from '../footers/ProfileScreen';
import { signOut } from 'firebase/auth';
import { FirebaseAuth, FirebaseDB } from '../config/firebaseConfig';
import { userAuthentication } from '../config/userAuthentication';
import { deleteDoc, doc } from 'firebase/firestore';

type Nav = NativeStackNavigationProp<RootStackParamList>
const collectionName = "userList"
const SettingHomeScreen = () => {
    const { user } = userAuthentication()
    const navigation = useNavigation<Nav>()

    return (
        <View style={styles.container}>
            <ProfileScreen />
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => navigation.navigate("About")}
                >
                    <FontAwesome6 name="circle-info" size={16} color="#4c787e" />
                    <Text>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => navigation.navigate("FAQ")}
                >
                    <FontAwesome6 name="hire-a-helper" size={16} color="#4c787e" />
                    <Text>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => signOut(FirebaseAuth)}
                >
                    <FontAwesome6 name="right-from-bracket" size={16} color="red" />
                    <Text>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default SettingHomeScreen 

import { View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { styles } from '../g03CSS'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
type Nav = NativeStackNavigationProp<RootStackParamList>

const AboutMenuScreen = () => {
    const navigation = useNavigation<Nav>()

    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => navigation.navigate("What")}
                >
                    <FontAwesome6 name="laptop" size={16} color="#4c787e" />
                    <Text>What is Electronics Auction?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.footerItem}
                    onPress={() => navigation.navigate("TechnologyUsed")}
                >
                    <FontAwesome6 name="screwdriver-wrench" size={16} color="#4c787e" />
                    <Text>Technology Used</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AboutMenuScreen
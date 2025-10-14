import { Image, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../g03CSS';
import { FirebaseAuth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Nav = NativeStackNavigationProp<RootStackParamList>

const SignInScreen = () => {

    const navigation = useNavigation<Nav>()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const loadRememberUser = async () => {
            const storedRememberMe = await AsyncStorage.getItem("@rememberMe")
            if (storedRememberMe === "true") {
                const storedEmail = await AsyncStorage.getItem("@storedEmail")
                const storedPassword = await AsyncStorage.getItem("@storedPassword")
                setRememberMe(true)
                setEmail(storedEmail ? storedEmail : "")
                setPassword(storedPassword ? storedPassword : "")
            }
            else {
                setRememberMe(false)
                setEmail("")
                setEmail("")
            }
        }
        loadRememberUser()
    }, [])

    async function signIn() {
        if (email === '' || password === '') {
            setError("Fields cannot be empty.")
            return
        }
        try {
            const result = await signInWithEmailAndPassword( FirebaseAuth, email, password)
            if (rememberMe) {
                await AsyncStorage.setItem("@rememberMe", rememberMe.toString());
                await AsyncStorage.setItem("@storedEmail", email);
                await AsyncStorage.setItem("@storedPassword", password);
            } else {
                await AsyncStorage.setItem("@rememberMe", rememberMe.toString());
                await AsyncStorage.removeItem("@storedEmail");
                await AsyncStorage.removeItem("@storedPassword");
            }
        } catch (err: any) {
            console.log(`Login failed: ${error}`)
            setError(`Login failed: ${error}`)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require("../assets/logoMain.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.welcome}>
                <TextInput
                    style={styles.inputStyle}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='Email'
                    placeholderTextColor="gray"
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputStyle}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Enter password'
                    placeholderTextColor="gray"
                    keyboardType='default'
                    maxLength={12}
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <View style={styles.toggle}>
                    <Text>Remember Me?</Text>
                    <Switch
                        value={rememberMe}
                        onValueChange={setRememberMe}
                        trackColor={{ false: "#888", true: "#4CAF50" }}
                        thumbColor={rememberMe ? "white" : "red"}
                    />
                </View>
                {
                    !!error &&
                    <Text style={styles.errorDisplay}>{error}</Text>
                }
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={signIn}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("SignUpScreen")
                    }}
                >
                    <Text style={{textAlign: "center", marginVertical: 15}}>Don't have account yet? {"\n"}Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SignInScreen
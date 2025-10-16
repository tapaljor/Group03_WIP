import { Image, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { styles } from '../g03CSS';
import { FirebaseAuth, FirebaseDB } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, reload, updateProfile } from 'firebase/auth';
import { RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from 'firebase/firestore';
import { UserDoc } from '../models/UserDoc';

type Nav = NativeStackNavigationProp<RootStackParamList>
const defaultImage = "https://plus.unsplash.com/premium_photo-1667538962342-2d9937f014d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const collectionName = "userList"

const SignUpScreen = () => {
    const navigation = useNavigation<Nav>()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [photoUrl, setPhotoUrl] = useState("")
    const [isSeller, setIsSeller] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (password !== confirmPassword) {
            setError("Password mistached.")
        } else {
            setError("")
        }
    }, [password, confirmPassword])

    async function signUp() {
        if (email === '' || password === '' || displayName === '') {
            setError("Email, Password, Name are mendatory.")
            return
        }
        if (password !== confirmPassword) {
            setError("Password mistached.")
            return
        }
        try {
            const { user } = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
            // after user created update profile provided by firebaseAuth
            await updateProfile(user, {
                displayName: displayName.trim(),
                photoURL: photoUrl ?? defaultImage
            })
            await user.reload()
            await user.getIdToken(true)
            const data: UserDoc = {
                id: user?.uid,
                isSeller: isSeller
            }
            const userRef = doc(FirebaseDB, collectionName, user?.uid)
            await setDoc(userRef, data)
        } catch (err: any) {
            console.log("Error: ${err}")
            setError(`Error: ${err}`)
        }
    }
    useLayoutEffect(() => {
        navigation.setOptions({ title: "Registration" })
    })
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
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.inputStyle}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Enter password'
                    keyboardType='default'
                    maxLength={12}
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputStyle}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder='Confirm password'
                    keyboardType='default'
                    maxLength={12}
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.inputStyle}
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholder='Enter your name'
                    keyboardType='default'
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.inputStyle}
                    value={photoUrl}
                    onChangeText={setPhotoUrl}
                    placeholder='Image Url'
                    keyboardType='default'
                    autoCorrect={false}
                />
                <View style={styles.toggle}>
                    <Text>Are you a seller?</Text>
                    <Switch
                        value={isSeller}
                        onValueChange={setIsSeller}
                        trackColor={{ false: "#888", true: "#4CAF50" }}
                        thumbColor={isSeller ? "white" : "red"}
                    />
                </View>
                {
                    !!error &&
                    <Text style={styles.errorDisplay}>{error}</Text>
                }
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={signUp}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SignUpScreen
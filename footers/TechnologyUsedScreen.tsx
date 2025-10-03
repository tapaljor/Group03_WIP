import { SafeAreaView, ScrollView, Text, TouchableOpacity, Linking } from "react-native"
import { styles } from "../g03CSS"

const TechnologyUsedScreen = () => {

    const openLink = (url: string) => {
        Linking.openURL(url)
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Platform</Text>
                <TouchableOpacity
                    onPress={() => openLink('https://reactnative.dev/')}
                >
                    <Text style={styles.paragraph}>React Native</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Database</Text>
                <TouchableOpacity
                    onPress={() => openLink('https://firebase.google.com/')}
                >
                    <Text style={styles.paragraph}>Firebase</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Icons</Text>
                <TouchableOpacity
                    onPress={() => openLink('https://fontawesome.com/')}
                >
                    <Text style={styles.paragraph}>Font Awesome</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Images</Text>
                <TouchableOpacity
                    onPress={() => openLink('https://unsplash.com/')}
                >
                    <Text style={styles.paragraph}>Unsplash</Text>
                </TouchableOpacity>
                <Text style={styles.header}>Payment</Text>
                <TouchableOpacity
                    onPress={() => openLink('https://stripe.com/')}
                >
                    <Text style={styles.paragraph}>Stripe</Text>
                </TouchableOpacity>
                 <Text style={styles.header}>Map</Text>
                <TouchableOpacity
                    onPress={() => openLink('https://developers.google.com/maps')}
                >
                    <Text style={styles.paragraph}>Google Map</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
    )
}

export default TechnologyUsedScreen
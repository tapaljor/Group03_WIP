import { SafeAreaView, ScrollView, Text } from "react-native";
import { styles } from "../g03CSS";

const FaqScreen = () => {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>How do I create an account?</Text>
                <Text style={styles.paragraph}>
                    1. Open Profile (bottom).{"\n"}
                    2. Tap Sign Up and enter email + password.{"\n"}
                    3. (Optional) Add display name and shipping address.{"\n"}
                    4. Verify your email if prompted.
                </Text>

                <Text style={styles.header}>How do I place a bid?</Text>
                <Text style={styles.paragraph}>
                    1. Open a listing and review photos/specs/condition.{"\n"}
                    2. Tap Place Bid.{"\n"}
                    3. Enter your bid or a maximum for Auto‑Bid.{"\n"}
                    4. Confirm. Bids are binding while the auction is live.
                </Text>

                <Text style={styles.header}>What is Auto‑Bid?</Text>
                <Text style={styles.paragraph}>
                    Auto‑Bid automatically raises your bid just enough to stay in the lead,{"\n"}
                    up to your maximum. You can edit your max while the auction is open.
                </Text>

                <Text style={styles.header}>How do I watch or follow an item?</Text>
                <Text style={styles.paragraph}>
                    1. On any listing, tap Watch.{"\n"}
                    2. Find all watched items under Watchlist in Profile.{"\n"}
                    3. Enable notifications to get price and ending alerts.
                </Text>

                <Text style={styles.header}>How do I list and sell my electronics?</Text>
                <Text style={styles.paragraph}>
                    1. Go to Add Item buttom tab.{"\n"}
                    2. Choose a category (phone, laptop, audio, console, etc.).{"\n"}
                    3. Add clear photos, model/specs, and select condition.{"\n"}
                    4. Set starting price, duration, and optional reserve price.{"\n"}
                    5. Pick shipping or local pickup options and publish.
                </Text>

                <Text style={styles.header}>How are conditions defined?</Text>
                <Text style={styles.paragraph}>
                    • New: Unopened retail packaging.{"\n"}
                    • Like New: Looks new; 100% functional, minimal/no wear.{"\n"}
                    • Good: Light wear; fully functional.{"\n"}
                    • Fair: Noticeable wear or minor defects; fully functional.{"\n"}
                    • For Parts/Not Working: Sold as‑is; functionality not guaranteed.
                </Text>

                <Text style={styles.header}>How do payments and fees work?</Text>
                <Text style={styles.paragraph}>
                    Buyers pay securely in‑app after winning. Any seller fees are shown{"\n"}
                    before you publish a listing. Never pay or accept payment off‑platform.
                </Text>

                <Text style={styles.header}>Shipping or local pickup?</Text>
                <Text style={styles.paragraph}>
                    Sellers can offer shipping, local pickup, or both. For pickup, meet in{"\n"}
                    a public place. For shipping, upload a tracking number after payment.
                </Text>

                <Text style={styles.header}>Can I cancel a bid or end a listing?</Text>
                <Text style={styles.paragraph}>
                    Bid retractions are limited to obvious mistakes and may require review.{"\n"}
                    Sellers can end a listing before significant bidding activity. Use the{"\n"}
                    in‑app options or contact support if you need help.
                </Text>

                <Text style={styles.header}>How do I delete my account?</Text>
                <Text style={styles.paragraph}>
                    1. Go to Settings.{"\n"}
                    2. Tap "Delete Account".{"\n"}
                    3. Confirm. This permanently removes your data as described in our policy.
                </Text>
                <Text style={styles.header}>How payment is handled?</Text>
                <Text style={styles.paragraph}>
                    1. We use globall used payment gateway Stripe.{"\n"}
                    2. Every payment heavy lifting is done by Stripe.{"\n"}
                    3. It is used by millions including OpenAI, Amazon, Google, Shopify, Airbnb etc. {"\n"}
                    4. Bottomline: It is secure. {"\n"}
                </Text>

                <Text style={{ fontStyle: "italic", marginTop: 15 }}>
                    Last updated: Sep 14, 2025
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default FaqScreen;

import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { styles } from "../g03CSS";

export default function WhatScreen() {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Welcome to ElectroAuction</Text>
                <Text style={styles.paragraph}>
                    ElectroAuction is a simple, secure marketplace to{"\n"}
                    buy and sell phones, laptops, audio gear, gaming consoles,{"\n"}
                    and other electronics through fast, transparent auctions.
                </Text>

                <Text style={styles.header}>Browse free, sign in to bid</Text>
                <Text style={styles.paragraph}>
                    Explore live and upcoming auctions without an account.{"\n"}
                    Create an account to place bids, watch items, or list your own gear.
                </Text>

                <Text style={styles.header}>No subscriptions</Text>
                <Text style={styles.paragraph}>
                    There are no monthly fees. Any applicable selling or payment fees{"\n"}
                    are clearly shown before you confirm.
                </Text>

                <Text style={styles.header}>Why people use ElectroAuction</Text>
                <Text style={styles.paragraph}>
                    • Real‑time bidding with auto‑bid support.{"\n"}
                    • Verified categories and clear photos/specs.{"\n"}
                    • Price alerts and watchlists to track deals.{"\n"}
                    • Flexible delivery: ship or local pickup where available.
                </Text>

                <Text style={styles.header}>Safety & trust</Text>
                <Text style={styles.paragraph}>
                    • Only pay inside the app—never send money off‑platform.{"\n"}
                    • Meet in safe, public locations for local pickup.{"\n"}
                    • No counterfeit, stolen, or unsafe items.{"\n"}
                    • Use Report for suspicious listings or behavior.
                </Text>

                <Text style={styles.header}>What ElectroAuction is not</Text>
                <Text style={styles.paragraph}>
                    • Not a pawn shop or repair service.{"\n"}
                    • Not an escrow service outside our in‑app flow.{"\n"}
                    • Not a place for prohibited or illegal items.
                </Text>

                <Text style={styles.header}>How auctions work</Text>
                <Text style={styles.paragraph}>
                    • Sellers set a starting price and duration.{"\n"}
                    • Bidders compete; the highest valid bid at close wins.{"\n"}
                    • Winners complete payment promptly to avoid cancellation.{"\n"}
                    • Sellers ship or arrange pickup after payment is confirmed.
                </Text>

                <Text style={styles.header}>Built with care</Text>
                <Text style={styles.paragraph}>
                    We’re an indie team focused on safety, clarity, and great deals.{"\n"}
                    Thanks for helping keep the marketplace fair and friendly.
                </Text>

                <Text style={{ fontStyle: "italic", marginTop: 15 }}>
                    Last updated: Sep 14, 2025
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

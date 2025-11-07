import React, { useState } from 'react'
import { Platform, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Button, ScrollView, KeyboardAvoidingView, FlatList } from 'react-native'
import { styles } from '../g03CSS'
import { SafeAreaView } from 'react-native-safe-area-context';
import context from "../utils/aiReference.ts";

const BASE = Platform.OS === "android"
    ? "http://10.0.2.2:11434"
    : "http://localhost:11434";

const MODEL = "phi3:mini";


export default function ChatHomeScreen2() {
    const [chat, setChat] = useState([{ role: "assistant", content: "Hi, How can I help you?" }])
    const [input, setInput] = useState("")


    const ask = async () => {
        if (!input.trim()) return
        const user = { role: "user", content: input }
        setChat([...chat, user])
        setInput("")

        const prompt =
            `You are a customer care agent. Use ONLY the information inside <CONTEXT>...</CONTEXT>.
                If the answer is not fully supported by the context, 
                reply exactly: "Not in context".

        <CONTEXT>
            ${context}
        </CONTEXT>

        Conversation so far:
            ${[...chat, user].map(m => `${m.role}: ${m.content}`).join("\n")}

        Answer:`;

        try {
            const res = await fetch(`${BASE}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: MODEL,
                    stream: false,
                    prompt
                }),
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            const content = data?.response ?? "(no reply)"
            setChat(prev => [...prev, { role: "assistant", content }])
        } catch (e: any) {
            setChat(prev => [...prev, { role: "assitant", content: `Error: ${e.message || e}` }])
        }
    }
    const ListItem = ({ item }) => (
        <View style={styles.mainView}>
            <Text>{item.role}: {item.content}</Text>
        </View>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 60}
            >
                <FlatList
                    style={{ flex: 1, }}
                    data={chat}
                    keyExtractor={(_, i) => String(i)}
                    renderItem={({ item }) => <ListItem item={item} />}
                    contentContainerStyle={{ padding: 12, paddingBottom: 80 }}
                    keyboardShouldPersistTaps="handled"
                />
                <View style={styles.stickyKB}>
                    <TextInput
                        style={styles.inputStyle}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type.."
                    />
                    <TouchableOpacity
                        onPress={ask}
                        style={styles.buttonStyle}
                    >
                        <Text>Ask Local AI Ollama</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


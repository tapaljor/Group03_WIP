import React, { useRef, useState } from 'react';
import {
    Platform,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    FlatList
} from 'react-native';
import { styles } from '../g03CSS';
import context from "../utils/aiReference.ts";

const BASE = Platform.OS === "android"
    ? "http://10.0.2.2:11434"
    : "http://localhost:11434";

const MODEL = "phi3:mini";

export default function ChatHomeScreen2() {
    const [chat, setChat] = useState([
        { role: "assistant", content: "Hi, How can I help you?" }
    ]);
    const [input, setInput] = useState("");

    const flatListRef = useRef<FlatList>(null);

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    const ask = async () => {
        if (!input.trim()) return;

        const user = { role: "user", content: input.trim() };

        // use functional update so we don’t depend on stale chat
        setChat(prev => [...prev, user]);
        setInput("");

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
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const content = data?.response ?? "(no reply)";

            setChat(prev => [...prev, { role: "assistant", content }]);
        } catch (e: any) {
            setChat(prev => [
                ...prev,
                { role: "assistant", content: `Error: ${e.message || e}` }
            ]);
        }
    };

    const ListItem = ({ item }) => (
        <View style={[styles.mainView, { marginBottom: 10 }]}>
            <Text>{item.role.toUpperCase()}: {item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 60}
            >
                <FlatList
                    ref={flatListRef}
                    style={styles.flatList}
                    data={chat}
                    keyExtractor={(_, i) => String(i)}
                    renderItem={({ item }) => <ListItem item={item} />}
                    keyboardShouldPersistTaps="handled"
                    onContentSizeChange={scrollToBottom}
                    onLayout={scrollToBottom}
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
        </View>
    );
}

import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { styles } from '../g03CSS'

export default function ChatHomeScreen() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const ask = async () => {
        if (!question.trim()) return
        setLoading(true); setError(null); setAnswer('')
        try {
            const res = await fetch('http://localhost:3000/faq-ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question })
            })
            const data = await res.json()
            if (res.ok) setAnswer(data.answer)
            else setError(data.error || 'Something went wrong')
            setQuestion("") // reset previous qutestion
        } catch (e: any) {
            setError(e?.message || 'Network error')
        } finally {
            setLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Help assisted by OpenAI?</Text>
            <TextInput
                style={styles.inputStyle}
                placeholder="Ask a question (e.g., Is online payment secure?)"
                value={question}
                onChangeText={setQuestion}
            />
            <TouchableOpacity
                onPress={ask}
                style={styles.buttonStyle}
            >
                <Text>Ask</Text>
            </TouchableOpacity>
            { loading && <ActivityIndicator/>}
            {!!error && <Text style={{ color: "red"}}>{error}</Text>}
            {!!answer && <Text>{answer}</Text>}
        </View>
    )
}


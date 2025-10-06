require("dotenv").config()
const express = require("express")
const cors = require("cors")
const Stripe = require("stripe")
const OpenAI = require("openai")

const FAQ = [
    { q: "How do I reset my password?", a: "Go to Settings → Reset Password. Check your email for a code." },
    { q: "How to contact support?", a: "Email support@group3.com." },
    // Tip: avoid test-card specifics in public answers; direct users to the help page instead.
    { q: "What if payment didn't go through?", a: "Please try again or contact support for help with test/sandbox cards." },
    { q: "What platform and technologies used for group 3 WIP?", a: "React Native, Node/Express, Firebase (Auth/Firestore/RTDB), OpenAI, Stripe, Google Maps." },
    { q: "Is online payment stripe secure?", a: "The project uses Stripe online system, it is secure. Most of the big companies uses Stripe including OpenAI." },
]

// rules and closed quotes fixed
const systemRules = `
You are a assistant. Use can answer Project Context supplied.
If they ask question out of context, you can say "This is not related to project, but.."
If the answer isn't clearly present, reply exactly: "Sorry, I don't have that information yet."
Keep answers short and clear.
`

// helps answers. 
const PROJECT_CONTEXT = `
Project Title: Online Electronics E-commerce (Focum)
Goal: Cross-platform auction marketplace for used electronics with real-time bidding (Firebase RTDB), notifications, and verified users.

Core Features:
- Auth & Profiles (Firebase Auth)
- Real-time Auctions with countdown
- Push Notifications (bids, outbid, ending soon, win)
- Search & Filters (category, brand, location, price)
- Payments & Transaction Logs (Stripe)
- Tech: React Native (mobile), Node/Express (backend), Firebase (Auth, Firestore, RTDB), Google Maps.

Planned Screens:
Login/Signup, Home/Dashboard (live/upcoming auctions), Create Auction, Auction Detail (current highest bid, bid history), Bid Confirmation, Profile, Search/Category, Notifications, Transactions.
`

// Optional: clip context if you paste a very large string later
const clamp = (s, max = 8000) => (s.length > max ? s.slice(0, max) + "\n...[truncated]..." : s)

const app = express()
app.use(cors())
app.use(express.json())

// --- Stripe setup (unchanged) ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// --- OpenAI client ---
const apiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Helper to compose a compact FAQ text
const faqAsText = () => FAQ.map((x, i) => `Q${i + 1}: ${x.q}\nA${i + 1}: ${x.a}`).join('\n\n')

// --- OpenAI FAQ route ---
app.post('/faq-ask', async (req, res) => {
    try {
        const { question = "" } = req.body || {}

        const response = await apiClient.responses.create({
            model: "gpt-4o-mini",
            input: [
                { role: "system", content: systemRules },
                {
                    role: "user", content:
                        `FAQ:
${faqAsText()}

Project Context:
${clamp(PROJECT_CONTEXT)}

User question: ${question}

Instructions:
- If the answer comes from FAQ or Project Context, answer briefly.
- If not present, reply exactly: "Sorry, I don't have that information yet."
- If helpful, mention which FAQ number or "Project Context" you used.`
                }
            ],
            max_output_tokens: 300
        })

        res.json({ answer: response.output_text || "" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to get answer" })
    }
})

// --- Stripe checkout (unchanged) ---
app.post("/checkout", async (req, res) => {
    try {
        const { amount, currency = "cad", name = "Item", quantity = 1 } = req.body || {}
        if (!Number.isInteger(amount) || amount <= 0) {
            return res.status(400).json({ error: `Invalid amount: ${amount}` })
        }
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [{
                quantity,
                price_data: {
                    currency,
                    unit_amount: amount,
                    product_data: { name },
                },
            }],
            success_url: "https://example.com/success",
            cancel_url: "https://example.com/cancel",
        })
        res.json({ url: session.url })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})

app.get("/health", (_req, res) => res.json({ ok: true }))

const port = process.env.PORT || 3000
app.listen(port, "0.0.0.0", () => console.log(`Server on http://localhost:${port}`))

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // sk_test_...

app.post("/checkout", async (req, res) => {
  try {
    const { amount, currency = "cad", name = "Item", quantity = 1 } = req.body || {};
    if (!Number.isInteger(amount) || amount <= 0) {
      return res.status(400).json({ error: `Invalid amount: ${amount}` });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        quantity,
        price_data: {
          currency,
          unit_amount: amount,   // cents
          product_data: { name },
        },
      }],
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => console.log(`Server on http://localhost:${port}`));

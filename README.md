# 🏋️‍♂️ Superman AI

> A community-driven AI agent that manages pooled fitness funds, automates gym memberships, and refunds unused value—powered by CDP Wallets and smart automation.

---

## 🚀 Features

- 🔐 Social Login with Web3 CDP Wallet Creation
- 🤖 AI Agent that Automates Membership Purchases
- 👥 Group Formation & Collaborative Funding
- 💸 CDP Wallet Integration for Fund Pooling
- 🧾 Day Pass Generation with QR Codes
- 🏋️‍♀️ Gym Attendance Tracking
- 🔄 Monthly Refund Distribution Based on Usage
- 🔔 Smart Notifications on Group Milestones
- 📆 Cycle Repeats Automatically Every Month

---

## 🖼️ Demo Flow

1. **User logs in via Google** → CDP wallet is created.
2. **User joins or creates a group** → sets monthly membership target (e.g. ₹3000).
3. **Users fund the group’s AI agent wallet**.
4. When the group wallet reaches the target:
    - 🤖 Agent buys a monthly membership.
    - 🔔 All users get notified.
5. Members can request **1-day gym passes** by paying a small fee → gets a **QR Code**.
6. Users scan QR at gym to mark attendance.
7. At month’s end:
    - Agent calculates missed days.
    - Refunds are sent back proportionally to users’ CDP wallets.
    - Next cycle begins automatically.

---

## 🧠 Architecture

- Frontend: Next.js + TailwindCSS
- Backend: Node.js + tRPC
- Auth: NextAuth.js
- Wallets: x402pay + CDP Wallets
- QR Code: qrcode (Node.js)
- Agent: AgentKit / OpenAI + CRON + AWS Bedrock
- Database: Supabase Postgres



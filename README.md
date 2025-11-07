# 🧠 QuickAI – Full Stack AI SaaS App (PERN Stack)

**Live URL:** [https://quick-ai-livid-omega.vercel.app/](https://quick-ai-livid-omega.vercel.app/)

QuickAI is a full-stack **AI-powered SaaS application** built using the **PERN Stack** (PostgreSQL, Express.js, React, Node.js).
It provides multiple AI tools such as article generation, image creation, background removal, and resume analysis — all wrapped inside a secure, subscription-based platform.

---

## 🚀 Tech Stack

**Frontend:** React.js, Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** PostgreSQL (Serverless by [Neon.tech](https://neon.tech))
**Authentication:** [Clerk.dev](https://clerk.com) for secure user auth & profile management
**Deployment:** Vercel (Frontend), Neon (Database)
**AI Integration:** OpenAI API / Replicate API (for image tasks)

---

## 🔐 Key Features

### 🧑‍💻 User Authentication

* Secure **sign-in** and **sign-up** using **Clerk**
* Persistent **session management**
* **User profile dashboard** for managing subscription and credits

### 💳 Subscription Billing

* Integrated **Premium subscription** system
* Free users can access limited tools with **credit-based limits**
* Premium users unlock **all AI tools** without limits

### 🗄️ Serverless PostgreSQL Database

* Hosted on **Neon** for scalable, serverless data storage
* Stores user info, credits, and activity logs securely

---

## 🧰 AI Tools & Features

| Feature                      | Description                                             | Free Plan | Premium Plan |
| ---------------------------- | ------------------------------------------------------- | --------- | ------------ |
| 📰 **Article Generator**     | Generate articles by providing title & desired length   | ✅         | ✅            |
| 🏷️ **Blog Title Generator** | Create engaging blog titles based on keyword & category | ✅         | ✅            |
| 🧾 **Resume Analyzer**       | Upload a resume and get detailed AI analysis            | ❌         | ✅            |
| 🖼️ **Image Generator**      | Generate stunning images from text prompts              | ❌         | ✅            |
| ✂️ **Background Remover**    | Upload an image and get a transparent background        | ❌         | ✅            |
| 🧹 **Object Remover**        | Remove unwanted objects from uploaded images            | ❌         | ✅            |

---

## 💡 Subscription Plans

### 🆓 Free Plan

* Includes:

  * **Article Generator**
  * **Blog Title Generator**
* Comes with **10 credits**

  * Each use deducts **1 credit**
  * When credits reach **0**, access to free tools is restricted
* Users can upgrade anytime to premium

### 🌟 Premium Plan

* Access to **all AI features**
* Unlimited usage with no credit restrictions
* Priority API response and faster performance

---

## ⚙️ Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/quick-ai.git
cd quick-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root directory with the following keys:

```
DATABASE_URL=your_neon_postgres_url
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
OPENAI_API_KEY=your_openai_api_key
REPLICATE_API_TOKEN=your_replicate_api_token
FRONTEND_URL=https://quick-ai-livid-omega.vercel.app
```

### 4. Run the server

```bash
npm run server
```

### 5. Run the frontend

```bash
npm run client
```

---

## 🧑‍🎨 UI Overview

* Clean, responsive, and minimal UI using **Tailwind CSS**
* Dashboard shows:

  * Current plan & remaining credits
  * Available AI tools
  * Upgrade button for premium access

---

## 🧾 Credits & Licensing

This project is developed as an **AI SaaS demo** showcasing the integration of:

* Modern full-stack architecture (PERN)
* Third-party services (Clerk, Stripe, OpenAI, Replicate)
* Scalable and modular AI tool development

> © 2025 QuickAI — All rights reserved.

---

## 🌐 Links

* **Live Site:** [quick-ai-livid-omega.vercel.app](https://quick-ai-livid-omega.vercel.app/)
* **Clerk:** [https://clerk.com](https://clerk.com)
* **Neon Database:** [https://neon.tech](https://neon.tech)
* **Vercel Deployment:** [https://vercel.com](https://vercel.com)
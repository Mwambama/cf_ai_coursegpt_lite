
# 🤖 cf_ai_coursegpt_lite

This project is an AI-powered tutor agent built on the Cloudflare Agents platform. It was created for the "Optional Assignment" for the Cloudflare Software Engineer Intern (Summer 2026) application.

The agent demonstrates a complete Retrieval-Augmented Generation (RAG) pipeline built entirely on the Cloudflare stack. It's a "lite" version of a more complex `CourseGPT` project, adapted specifically to use Cloudflare's native AI and state management tools.

---

## Features

* **🧠 Retrieval-Augmented Generation (RAG):** Uses **Cloudflare Vectorize** to store course notes and provide relevant context to the LLM.
* **🤖 Stateful Agent Logic:** Uses **Cloudflare Agents** (built on **Durable Objects**) to maintain persistent conversation history (memory) for each chat.
* **⚡️ Serverless AI:** Powered by **Cloudflare Workers AI** using the Llama 3 model for reasoning and generating answers.
* **📚 Dynamic Knowledge Base:** Includes a callable agent method to add new course material to the Vectorize database on the fly.
* **💬 API-Ready:** Exposes simple, callable methods (`askQuestion`, `addCourseMaterial`) that can be easily connected to any frontend.

---

## Prerequisites

* A Cloudflare account.
* [Node.js](https://nodejs.org/en) (v18 or later) installed.
* The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.

---

## Quick Start

### 1. Clone the Repository


git clone [https://github.com/Mwambama/cf_ai_coursegpt_lite.git](https://github.com/Mwambama/cf_ai_coursegpt_lite.git)

cd cf_ai_coursegpt_lite

### 2. Install dependency

  npm install

### 3. Create Cloudflare Bindings

project requires three Cloudflare bindings
  which sets up wrangler.toml file but must be created first

A. Create the Vectorize Index (for RAG):

B. Add Bindings to wrangler.toml

4. Run Locally  

(to your Cloudflare account to get a live URL)

npm run dev
# or
npm run start

5. Deploy

npm run deploy
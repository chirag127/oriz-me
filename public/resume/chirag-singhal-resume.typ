// Chirag Singhal — comprehensive résumé (Typst)
// Compile: typst compile chirag-singhal-resume.typ
#set document(title: "Chirag Singhal — Résumé", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[Software Engineer — SAP CPQ / Lead-to-Cash · Backend, Full-Stack & Applied AI] \
  #v(3pt)
  #text(size: 9pt)[
    Ghaziabad, India #h(6pt)·#h(6pt)
    +91 74284-49707 #h(6pt)·#h(6pt)
    #link("mailto:chirag@oriz.in")[#"chirag@oriz.in"] #h(6pt)·#h(6pt)
    #link("https://github.com/chirag127")[github.com/chirag127] #h(6pt)·#h(6pt)
    #link("https://linkedin.com/in/chirag127")[linkedin.com/in/chirag127] #h(6pt)·#h(6pt)
    #link("https://oriz.in")[oriz.in]
  ]
]
#v(3pt)

#let section(title) = [
  #v(6pt)
  #text(size: 11pt, weight: "bold", fill: accent, tracking: 0.5pt)[#upper(title)]
  #v(-4pt)
  #line(length: 100%, stroke: 0.7pt + accent)
  #v(3pt)
]

#let entry(role, org, loc, date) = [
  #grid(columns: (1fr, auto), align: (left, right), column-gutter: 10pt,
    [*#role* — #org], [#text(size: 9pt, fill: rgb("#555"))[#loc #h(3pt)·#h(3pt) #date]]
  )
]

#let proj(name, meta, link) = [
  #grid(columns: (1fr, auto), align: (left, right), column-gutter: 10pt,
    [*#name* #text(size:9pt, fill:rgb("#555"))[· #meta]], [#text(size:9pt, fill:accent)[#link]]
  )
]

#section("Summary")
Software engineer with 3+ years across backend, full-stack, and applied AI, currently on SAP's Lead-to-Cash (CPQ) platform at Tata Consultancy Services, where I keep enterprise quoting systems running and build AI tooling that speeds real work. Alongside my day job I design and ship oriz.in — a self-run family of free, privacy-first web tools, live-data APIs, and open-source Model Context Protocol (MCP) servers used by AI agents — which keeps me fluent end-to-end, from backend architecture and data pipelines to frontend, DevOps, and the AI layer that ties it together. A JEE Advanced 2020 All India Rank 11870 (top 1%) and college topper, I move fast on hard problems and care about shipping. My vision is to build AI-native products that make powerful tools free and effortless for everyone — the way oriz.in already does at small scale.

#section("Experience")
_3+ years shipping backend, full-stack, and applied-AI systems — from enterprise SAP CPQ at TCS to a self-run family of production web tools and open-source libraries._
#v(4pt)
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Support the SAP CPQ (Configure-Price-Quote) Lead-to-Cash platform across 20+ functional areas — Bill of Materials & Pricing, Opportunity Management, Quote Info & Terms, Deal Reviews & Approvals, Provisioning, Contracting, OBV (Order-Based Value), and Public Cloud Order Management.
- Built a hybrid-RAG search and documentation system over the CPQ onboarding knowledge base (100+ videos, 40+ decks) — dense embeddings + BM25 + reranking on SAP-approved Hyperspace AI — that cuts ticket-resolution and onboarding time; currently completing the Cloud Quote KT knowledge base.
- Automate pricing and configuration validation, testing, and CI/CD workflows in Python; build React dashboards giving real-time visibility into backend configuration state.
- Diagnose and resolve configuration, pricing, and quote-lifecycle issues across a large enterprise codebase in an Agile team.
#v(4pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Built and maintained a high-traffic food-commerce platform end to end with Python, Node.js, and MongoDB.
- Designed an event-driven order-processing pipeline on Apache Kafka to synchronise orders across distributed outlets without data loss under peak load.
- Integrated a Razorpay payment gateway with HMAC-verified webhooks and secure authentication flows.
- Cut API response times through query optimisation, indexing, and Redis caching; built modular React frontend components.

#section("Open-Source Projects & Products")
#proj("oriz.in", "flagship · Astro · React · TypeScript · Cloudflare", link("https://oriz.in")[oriz.in])
- A growing family of free, privacy-first, client-side web tools and live-data APIs; all compute runs in-browser or on Cloudflare Workers — no server needed for end users. Publishes reusable `@chirag127/*` npm packages (design-system atoms, keyless multi-provider LLM client) that power every site.
#v(3pt)
#proj("Clear-Thought MCP Server", "36★ · TypeScript", link("https://github.com/chirag127/Clear-Thought-MCP-server")[chirag127/Clear-Thought-MCP-server])
- Model Context Protocol server exposing 11 structured-thinking tools (sequential thinking, mental models, design patterns, programming paradigms, debugging approaches, collaborative reasoning, decision frameworks, metacognitive monitoring, scientific method, structured argumentation, visual reasoning) to MCP-compatible AI clients; a lean, typed toolset built on the MCP SDK.
#v(3pt)
#proj("bookmark-mind", "10★ · JavaScript", link("https://github.com/chirag127/bookmark-mind-bs-ext")[chirag127/bookmark-mind-bs-ext])
- Chrome/Firefox extension that auto-categorises bookmarks with an LLM and offers AI chat + multi-model comparison over your saved links. Bring-your-own-key over any OpenAI-compatible endpoint (Groq, OpenRouter, Gemini, Mistral, local LM Studio / Ollama) through one uniform provider adapter — keys stored client-side, plus user-added custom providers.
#v(3pt)
#proj("OmniDistribute", "TypeScript", link("https://github.com/chirag127/OmniDistribute")[chirag127/OmniDistribute])
- Resilient, idempotent content-distribution engine that publishes a single Markdown source to 30+ platforms; adapter pattern with circuit-breaker + retry for at-least-once delivery.
#v(3pt)
- *Also:* Stochastic-Thinking MCP Server (probabilistic reasoning) · YouTube AI Navigator (Gemini chapter summaries) · olivia (Python voice assistant with fully offline speech recognition via local faster-whisper) · sponsorblock-ai (ML sponsor detection) — #link("https://github.com/chirag127")[github.com/chirag127]

#section("Skills")
*Languages:* Python (advanced), TypeScript, JavaScript, SQL, Bash \
*Backend:* Node.js, FastAPI, Flask, Express.js, REST APIs, microservices, event-driven architecture (Apache Kafka), authentication (OAuth2) \
*Frontend:* React, Astro, Tailwind CSS, HTML5/CSS3, PWAs, browser extensions (Chrome/Firefox) \
*AI / LLM:* MCP (Model Context Protocol) server development, RAG pipelines (dense embeddings + BM25 + reranking), multi-provider LLM integration (Gemini, Groq, Mistral, NVIDIA NIM, Cohere), prompt engineering, web scraping (Playwright / httpx / BeautifulSoup) \
*Databases & Storage:* PostgreSQL (Neon / Supabase), Turso (SQLite edge), Redis / Upstash, MongoDB \
*Cloud & DevOps:* Cloudflare Workers & Pages, Firebase, Docker, GitHub Actions CI/CD, Wrangler, Linux, cron-scheduled pipelines \
*Payments & Integrations:* Razorpay (orders, webhooks, HMAC verification), Clerk auth, sops + age secrets \
*Practices:* System design (HLD/LLD), OOP & SOLID, TDD, unit + integration testing, Agile, Git

#section("Qualification")
#entry("B.Tech, Computer Science & Engineering", "AKTU (A.P.J. Abdul Kalam Tech. University)", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1). \
- Senior Secondary (CBSE) — 97%.
#v(3pt)
*Honors & certifications:*
- *JEE Advanced 2020* — All India Rank 11870 (top 1%, ~1M+ aspirants).
- *Claude Certified Associate — Foundations*, Anthropic (2026).
- 20+ Udemy Business courses (via TCS) across AI/LLM (Claude Code, MCP, Generative AI), Machine Learning, Python, EU AI Act compliance, and Agile.

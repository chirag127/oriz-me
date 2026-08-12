// Chirag Singhal — crisp one-page résumé (Typst)
// Compile: typst compile chirag-singhal-resume.typ
#set document(title: "Chirag Singhal — Résumé", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Helvetica", "DejaVu Sans"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: false, leading: 0.6em)
#set list(spacing: 0.7em, indent: 3pt)
#show list: set block(spacing: 0.7em)

#let accent = rgb("#14532d")

// ---- header ----
#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[Software Engineer — SAP CPQ / Lead-to-Cash · Backend & Applied AI] \
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

#section("Summary")
Software engineer with 3+ years across backend, full-stack, and applied AI — currently on SAP's Lead-to-Cash platform at TCS. \
Blend of enterprise delivery and builder's range: I ship production systems, run oriz.in (a family of free web tools + open-source MCP servers), and turn AI into tools that cut real work — with a JEE Advanced AIR 11870 (top 1%) pedigree. \
Vision: build AI-native products that make powerful tools free and effortless for everyone — the way oriz.in already does at small scale.

#section("Experience")
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Support SAP CPQ Lead-to-Cash across 20+ areas (Bill of Materials & Pricing, Quote Terms, Deal Reviews, Provisioning, Contracting, OBV).
- Built a hybrid-RAG search over the onboarding knowledge base (100+ videos, 40+ decks) that cuts ticket-resolution time.
- Automate pricing/config validation and CI/CD in Python; build React dashboards for config visibility.
#v(4pt)
#entry("Full-Stack Developer", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Built a food-commerce platform (Python / Node.js / MongoDB) with a Kafka order pipeline and Razorpay payments.
- Cut API latency through query tuning and Redis caching.

#section("Projects")
- *oriz.in* — free client-side web tools & live-data APIs; runs in-browser / on Cloudflare Workers. Publishes `@chirag127/*` npm packages. #h(4pt)#text(size:9pt,fill:accent)[oriz.in]
- *Clear-Thought MCP Server* (36★) — MCP server giving AI agents 16 structured-thinking tools; zero runtime deps. #h(4pt)#text(size:9pt,fill:accent)[github.com/chirag127]
- *bookmark-mind* (10★) — Chrome extension that auto-sorts bookmarks with a local LLM, no cloud round-trip.

#section("Skills")
*Backend & AI:* Python, Node.js, FastAPI, REST APIs, MCP servers, RAG, multi-provider LLMs (Gemini/Groq/Mistral) \
*Frontend:* TypeScript, React, Astro, Tailwind CSS \
*Data & Infra:* PostgreSQL, Redis, MongoDB, Cloudflare Workers, Docker, GitHub Actions CI/CD

#section("Education")
#entry("B.Tech, Computer Science & Engineering", "AKTU (A.P.J. Abdul Kalam Tech. University)", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1) · Senior Secondary (CBSE) — 97%.

#section("Honors & Recognition")
- *JEE Advanced 2020* — All India Rank 11870 (top 1%).
- *Claude Certified Associate — Foundations*, Anthropic (2026).
- 20+ Udemy Business courses (TCS) across AI/LLM, Python, and MLOps.

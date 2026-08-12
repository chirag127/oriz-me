// Chirag Singhal — ATS-optimized single-column résumé (Typst)
// Compile: typst compile chirag-singhal-resume.typ
#set document(title: "Chirag Singhal — Résumé", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.4cm, y: 0.95cm))
#set text(font: ("Arial", "Helvetica", "DejaVu Sans"), size: 9.5pt, fill: rgb("#1a1a1a"))
#set par(justify: false, leading: 0.55em)
#set list(spacing: 0.62em, indent: 2pt)
#show list: set block(spacing: 0.55em)

#let accent = rgb("#14532d")   // deep green — professional, distinct

// ---- header ----
#align(center)[
  #text(size: 22pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 9.5pt, weight: "medium")[Software Engineer · SAP CPQ / Lead-to-Cash · Backend & Applied AI] \
  #v(3pt)
  #text(size: 9pt)[
    Ghaziabad, Uttar Pradesh, India #h(6pt)·#h(6pt)
    +91 74284-49707 #h(6pt)·#h(6pt)
    #link("mailto:chirag@oriz.in")[#"chirag@oriz.in"] #h(6pt)·#h(6pt)
    #link("https://oriz.in")[oriz.in] #h(6pt)·#h(6pt)
    #link("https://github.com/chirag127")[github.com/chirag127] #h(6pt)·#h(6pt)
    #link("https://linkedin.com/in/chirag127")[linkedin.com/in/chirag127]
  ]
]
#v(2pt)

// ---- section rule ----
#let section(title) = [
  #v(4pt)
  #text(size: 10.5pt, weight: "bold", fill: accent, tracking: 0.5pt)[#upper(title)]
  #v(-4pt)
  #line(length: 100%, stroke: 0.6pt + accent)
  #v(1pt)
]

#let entry(role, org, loc, date) = [
  #grid(columns: (1fr, auto), align: (left, right), column-gutter: 10pt,
    [*#role* — #org], [#text(size: 8.5pt, fill: rgb("#555"))[#loc #h(3pt)·#h(3pt) #date]]
  )
]

#section("Summary")
Software Engineer on the SAP CPQ (Configure-Price-Quote) Lead-to-Cash platform at TCS, supporting the quote-to-order lifecycle across 20+ functional areas and building internal tooling to accelerate it. Open-source builder — Model Context Protocol (MCP) servers, browser extensions, and the free oriz.in tools family. JEE Advanced 2020 AIR 11870; college topper (CGPA 8.81).

#section("Experience")
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar, India", "Jun 2025 – Present")
- Support the SAP CPQ Lead-to-Cash platform across 20+ functional areas — Bill of Materials & Pricing, Opportunity Management, Quote Info & Terms, Deal Reviews & Approvals, Provisioning, Contracting, OBV, and Public Cloud Order Management.
- Built a hybrid-RAG search and documentation system over the CPQ onboarding knowledge base (100+ videos, 40+ decks) to speed ticket resolution and onboarding; currently completing the Cloud Quote KT.
- Automate pricing/configuration validation and CI/CD workflows in Python; build React dashboards for backend configuration visibility.
#v(3pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Built and maintained a food-commerce platform (Python / Node.js / MongoDB).
- Designed an event-driven order-processing pipeline on Apache Kafka; integrated Razorpay with HMAC-verified webhooks; cut API latency via query tuning and Redis caching.

#section("Open-Source Projects")
#grid(columns: (1fr, auto), align: (left, right),
  [*oriz.in* — free client-side web tools & live-data APIs #text(size:9pt, fill: rgb("#555"))[(flagship)]], [#text(size:9pt, fill:accent)[#link("https://oriz.in")[oriz.in]]])
- A privacy-first family of browser-based tools + APIs; compute runs in-browser or on Cloudflare Workers. Publishes reusable `@chirag127/*` npm packages (design-system atoms, keyless multi-provider LLM client).
#v(3pt)
#grid(columns: (1fr, auto), align: (left, right),
  [*Clear-Thought MCP Server* #text(size:9pt, fill:rgb("#555"))[· 36★ · TypeScript]], [#text(size:9pt, fill:accent)[#link("https://github.com/chirag127/Clear-Thought-MCP-server")[chirag127/Clear-Thought-MCP-server]]])
- Model Context Protocol server exposing 16 structured-thinking tools (sequential reasoning, mental-model selection, debugging frameworks); zero runtime deps beyond the MCP SDK.
#v(3pt)
#grid(columns: (1fr, auto), align: (left, right),
  [*bookmark-mind* #text(size:9pt, fill:rgb("#555"))[· 10★ · JavaScript]], [#text(size:9pt, fill:accent)[#link("https://github.com/chirag127/bookmark-mind")[chirag127/bookmark-mind]]])
- Chrome extension that auto-categorises bookmarks via a local LLM call — no cloud round-trip; polished popup UI with one-click reorganise.
#v(3pt)
_Also:_ Stochastic-Thinking MCP · YouTube AI Navigator · OmniDistribute · olivia · sponsorblock-ai — #link("https://github.com/chirag127")[github.com/chirag127]

#section("Skills")
*Languages:* TypeScript, Python, JavaScript, SQL, Bash \
*Frontend:* React, Astro, Tailwind CSS, browser extensions (Chrome/Firefox) \
*Backend:* Node.js, FastAPI, Flask, Express.js, REST APIs \
*AI / LLM:* MCP server development, multi-provider LLM integration (Gemini, Groq, Mistral, NVIDIA NIM), RAG pipelines, web scraping (Playwright / httpx / BeautifulSoup) \
*Data & Infra:* PostgreSQL (Neon / Supabase), Turso, Redis, MongoDB, Cloudflare Workers & Pages, Firebase, Docker, GitHub Actions CI/CD

#section("Education")
#entry("B.Tech, Computer Science & Engineering", "AKTU (A.P.J. Abdul Kalam Tech. University)", "Uttar Pradesh", "2020 – 2024")
- CGPA 8.81 / 10 — College Topper (Rank 1). Class XII (CBSE) 97%.

#section("Honors & Certifications")
- *JEE Advanced 2020* — All India Rank 11870 (top 1%).
- *College Topper — Rank 1*, AKTU B.Tech CSE (2020–2024).
- *Claude Certified Associate — Foundations*, Anthropic (2026).
- *Professional Development (Udemy Business, TCS):* 20+ courses across AI/LLM (Claude Code, MCP, Generative AI), Python, ML for Data Engineers, EU AI Act Compliance, and Agile.

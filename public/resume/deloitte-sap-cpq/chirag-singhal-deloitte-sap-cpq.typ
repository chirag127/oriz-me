// Chirag Singhal — SAP CPQ Technical Consultant (Tailored for Deloitte)
// Compile: typst compile chirag-singhal-deloitte-sap-cpq.typ
#set document(title: "Chirag Singhal — SAP CPQ Technical Consultant", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[SAP CPQ Technical Consultant — Lead-to-Cash · Configuration, Pricing & Quote Management] \
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

#section("Professional Summary")
SAP CPQ Technical Consultant with 2+ years of hands-on experience on SAP's Lead-to-Cash (CPQ) platform at Tata Consultancy Services, supporting 20+ functional areas including Bill of Materials & Pricing, Opportunity Management, Quote Info & Terms, Deal Reviews & Approvals, Provisioning, Contracting, OBV, and Public Cloud Order Management. Deep expertise in SAP CPQ configuration, product modeling, pricing rules, quote management, and the end-to-end Quote-to-Cash process. Built a hybrid-RAG search system over the CPQ onboarding knowledge base (100+ videos, 40+ decks) to accelerate ticket resolution. Proficient in Python, JavaScript/TypeScript, SQL, and React for CPQ automation, testing, and dashboard development. Seeking to leverage SAP CPQ technical skills at Deloitte's Customer team to deliver enterprise configure-price-quote solutions.

#section("Core SAP CPQ Competencies")
#grid(columns: (1fr, 1fr), column-gutter: 15pt,
  [
    - *Product Configuration*: Bill of Materials, configurable products, attributes, compatibility rules, product hierarchies
    - *Pricing & Quoting*: Pricing rules, discount structures, quote design, proposal document generation, deal review workflows
    - *Lead-to-Cash*: Opportunity Management, Quote Info & Terms, Contracting, Provisioning, OBV, Public Cloud Order Management
  ],
  [
    - *Technical Development*: Scripting extensions, CPQ automation (Python), API integrations, CI/CD workflows
    - *Testing & Validation*: Automated pricing/configuration validation, regression testing, quote-lifecycle verification
    - *Knowledge Systems*: Hybrid-RAG documentation search (dense embeddings + BM25 + reranking) for CPQ onboarding
  ]
)

#section("Experience")
#entry("SAP CPQ Technical Consultant", "Tata Consultancy Services (TCS)", "Bhubaneswar", "Jun 2025 – Present")
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

#section("Technical Skills")
*Languages:* Python (advanced), TypeScript, JavaScript, SQL, Bash \\\
*SAP & CPQ:* SAP CPQ (CallidusCloud) configuration, product modeling, pricing rules, quote management, proposal documents, scripting extensions, Lead-to-Cash process, Quote-to-Cash, Deal Reviews & Approvals, OBV, Cloud Order Management \\\
*Backend & APIs:* Node.js, FastAPI, Flask, REST APIs, microservices, event-driven architecture (Apache Kafka), CI/CD pipelines \\\
*Frontend & Dashboards:* React, Astro, Tailwind CSS, HTML5/CSS3, real-time data visualization \\\
*AI & Search:* RAG pipelines (dense embeddings + BM25 + RRF fusion + cross-encoder reranking), vector search (LanceDB), LLM integration, prompt engineering, documentation search systems \\\
*Databases:* PostgreSQL, Turso (SQLite edge), Redis / Upstash, MongoDB \\\
*DevOps & Cloud:* Docker, Kubernetes, Cloudflare Workers & Pages, GitHub Actions CI/CD, Linux \\\
*Practices:* System design (HLD/LLD), Agile, TDD, unit + integration testing, Git, code review

#section("Education")
#entry("B.Tech, Computer Science & Engineering", "AKTU (A.P.J. Abdul Kalam Tech. University)", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1). \
- Senior Secondary (CBSE) — 97%.
#v(3pt)
*Honors & Certifications:*
- *JEE Advanced 2020* — All India Rank 11870 (top 1%, ~1M+ aspirants).
- *Claude Certified Associate — Foundations*, Anthropic (2026).
- 20+ Udemy Business courses (via TCS) across AI/LLM, Machine Learning, Python, and Agile.

#section("Projects & Open Source")
#proj("oriz.in", "flagship · Astro · React · TypeScript · Cloudflare", link("https://oriz.in")[oriz.in])
- A growing family of free, privacy-first web tools and live-data APIs; all compute runs in-browser or on Cloudflare Workers.
#v(3pt)
#proj("Clear-Thought MCP Server", "36★ · TypeScript", link("https://github.com/chirag127/Clear-Thought-MCP-server")[chirag127/Clear-Thought-MCP-server])
- Model Context Protocol server exposing 11 structured-thinking tools to MCP-compatible AI clients.
#v(3pt)
#proj("rag-lens", "Python · RAG · vector search", link("https://github.com/chirag127/rag-lens")[chirag127/rag-lens])
- Production hybrid-RAG service: dense embeddings + BM25 → RRF fusion → cross-encoder reranking over LanceDB, exposed via FastAPI + Docker.
#v(3pt)
- *Also:* bookmark-mind (LLM bookmark organiser) · OmniDistribute (content distribution engine) · agent-forge (multi-agent orchestrator) — #link("https://github.com/chirag127")[github.com/chirag127]

#let proj(name, meta, link) = [
  #grid(columns: (1fr, auto), align: (left, right), column-gutter: 10pt,
    [*#name* #text(size:9pt, fill:rgb("#555"))[· #meta]], [#text(size:9pt, fill:accent)[#link]]
  )
]

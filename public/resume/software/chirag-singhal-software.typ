// Chirag Singhal — Software / AI résumé
// Compile: typst compile chirag-singhal-software.typ chirag-singhal-software.pdf
#set document(title: "Chirag Singhal — Software & AI Engineer", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[Software Engineer — Backend, Full-Stack & Applied AI · Python · TypeScript · Go] \
  #v(3pt)
  #text(size: 9pt)[
    Ghaziabad, India #h(6pt)·#h(6pt)
    +91 74284-49707 #h(6pt)·#h(6pt)
    #link("mailto:chirag@oriz.in")[chirag\@oriz.in] #h(6pt)·#h(6pt)
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
Software engineer with 3+ years across backend, full-stack, and applied AI. Currently on SAP's Lead-to-Cash (CPQ) platform at TCS, building AI tooling (hybrid-RAG search, React dashboards, CI/CD automation) on top of an enterprise quoting system. Outside work I ship oriz.in — a self-run family of free, privacy-first web tools and open-source MCP servers. JEE Advanced AIR 11870 (top 1%) and college topper. Rate: \$25–50/hr.

#section("Experience")
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Support SAP CPQ Lead-to-Cash across 20+ functional areas (BOM & Pricing, Opportunity Mgmt, Deal Reviews, Provisioning, Contracting, Order Mgmt).
- Built hybrid-RAG search over a 100+ video / 40+ deck CPQ knowledge base — dense embeddings + BM25 + reranking on Hyperspace AI — cutting ticket-resolution and onboarding time.
- Automate pricing/configuration validation and CI/CD workflows in Python; build React dashboards for real-time backend visibility.
#v(4pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Built high-traffic food-commerce platform end-to-end: Python, Node.js, MongoDB.
- Event-driven order pipeline on Apache Kafka; Razorpay gateway with HMAC-verified webhooks.
- Cut API response times via query optimisation, indexing, Redis caching; modular React frontend.

#section("Open-Source Projects & Products")
#proj("agent-forge", "Python · multi-agent · evals", link("https://github.com/chirag127/agent-forge")[chirag127/agent-forge])
- Multi-agent LLM orchestrator — planner/executor/critic, pluggable JSON-schema tool-calling, provider failover, LLM-as-judge eval harness; OpenTelemetry-instrumented, 67 tests.
#v(3pt)
#proj("rag-lens", "Python · RAG · vector search", link("https://github.com/chirag127/rag-lens")[chirag127/rag-lens])
- Production hybrid-RAG: dense + BM25 → RRF fusion → cross-encoder reranking (LanceDB), FastAPI + Docker; eval suite reports Recall\@k / MRR / nDCG.
#v(3pt)
#proj("Clear-Thought MCP Server", "36★ · TypeScript", link("https://github.com/chirag127/Clear-Thought-MCP-server")[chirag127/Clear-Thought-MCP-server])
- 11 structured-thinking tools (sequential thinking, mental models, debugging, decision frameworks) for MCP-compatible AI clients.
#v(3pt)
#proj("deploy-kit / go-vault", "Kubernetes · Terraform · Go", link("https://github.com/chirag127/deploy-kit")[deploy-kit] + link("https://github.com/chirag127/go-vault")[go-vault])
- GitOps reference (Kustomize + Helm, HPA, NetworkPolicy, Argo CD, Prometheus/Grafana). Go gRPC microservice (pgx, Redis, rate limiting, graceful shutdown).
#v(3pt)
#proj("OmniDistribute", "TypeScript", link("https://github.com/chirag127/OmniDistribute")[chirag127/OmniDistribute])
- Idempotent content-distribution engine publishing one Markdown source to 30+ platforms; circuit-breaker + retry adapter pattern.
#v(3pt)
#proj("oriz.in", "flagship · Astro · React · Cloudflare", link("https://oriz.in")[oriz.in])
- Family of free, privacy-first web tools; all compute in-browser or on Cloudflare Workers. Publishes reusable `@chirag127/*` npm packages.

#section("Skills")
*Languages:* Python (advanced), TypeScript, JavaScript, Go, SQL, Bash \
*Backend:* Node.js, FastAPI, Flask, Express.js, REST + gRPC, Protocol Buffers, microservices, Apache Kafka, OAuth2 \
*Frontend:* React, Astro, Tailwind CSS, PWAs, browser extensions (Chrome/Firefox) \
*AI / LLM:* MCP server development, multi-agent orchestration, RAG pipelines (dense + BM25 + RRF + reranking), vector search (LanceDB), LLM evals (Recall\@k / MRR / nDCG), prompt engineering, multi-provider LLM integration \
*Databases:* PostgreSQL (Neon/pgx), Redis, MongoDB, Turso (SQLite edge) \
*Cloud & DevOps:* Docker, Kubernetes, Terraform, Argo CD, Prometheus/Grafana, OpenTelemetry, Cloudflare Workers & Pages, GitHub Actions, Linux \
*Practices:* System design (HLD/LLD), TDD, distributed systems, Agile, Git

#section("Qualification")
#entry("B.Tech, Computer Science & Engineering", "AKTU", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1). Senior Secondary (CBSE) — 97%.
#v(3pt)
*Honors & certifications:*
- *JEE Advanced 2020* — All India Rank 11870 (top 1%, ~1M+ aspirants).
- *Claude Certified Associate — Foundations*, Anthropic (2026).
- 20+ Udemy Business courses (AI/LLM, ML, Python, Agile) via TCS.

// Chirag Singhal — AI / Prompt Engineering / Consulting résumé
// Compile: typst compile chirag-singhal-ai-consulting.typ chirag-singhal-ai-consulting.pdf
#set document(title: "Chirag Singhal — AI Engineer & Consultant", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[AI Engineer — Prompt Engineering · RAG · Agents · LLM Evals · Automation] \
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
I design LLM systems that work in production: prompt pipelines with measurable evals, retrieval-augmented generation (dense + BM25 + reranking over vector DBs), and multi-agent orchestration (planner/executor/critic, JSON-schema tool-calling). Shipped a production multi-agent framework with an LLM-as-judge eval harness and a hybrid-RAG service reporting Recall\@k / MRR / nDCG. I wire keyless/local LLM providers to eliminate ongoing API costs, and instrument everything with OpenTelemetry so you see exactly what the model does. Claude Certified Associate (Anthropic, 2026). Rate: \$50–120/hr.

#section("AI / LLM Skills")
*Prompt engineering:* systematic prompt design, few-shot / chain-of-thought, eval-driven iteration, structured outputs (JSON schema), system-prompt hardening \
*RAG:* dense embeddings, BM25 sparse retrieval, RRF fusion, cross-encoder reranking, vector DBs (LanceDB, pgvector), chunking strategies, retrieval metrics (Recall\@k / MRR / nDCG) \
*Agents & orchestration:* planner/executor/critic architecture, JSON-schema function calling, tool registries, provider failover, multi-step reasoning, MCP (Model Context Protocol) server development \
*LLM evals:* LLM-as-judge harness, automated regression, OpenTelemetry tracing, latency + cost profiling \
*Providers:* Gemini, Groq, Mistral, NVIDIA NIM, Cohere, OpenAI-compatible APIs, keyless/local (Ollama, LM Studio) \
*Stack:* Python, FastAPI, Docker, OpenTelemetry, TypeScript, Claude Certified Associate (2026)

#section("AI Projects — Proof of Work")
#proj("agent-forge", "Python · multi-agent · evals", link("https://github.com/chirag127/agent-forge")[chirag127/agent-forge])
- Multi-agent LLM orchestrator: planner/executor/critic with pluggable JSON-schema tool-calling, provider failover across 6 providers, and an LLM-as-judge eval harness with automated regression. OpenTelemetry spans end-to-end; 67 tests.
#v(3pt)
#proj("rag-lens", "Python · hybrid RAG · retrieval evals", link("https://github.com/chirag127/rag-lens")[chirag127/rag-lens])
- Production hybrid-RAG service: dense embeddings + BM25 → RRF fusion → cross-encoder reranking over LanceDB; FastAPI + Docker. Eval suite surfaces Recall\@k, MRR, and nDCG on every run.
#v(3pt)
#proj("Clear-Thought MCP Server", "36★ · TypeScript · MCP", link("https://github.com/chirag127/Clear-Thought-MCP-server")[chirag127/Clear-Thought-MCP-server])
- MCP server exposing 11 structured-thinking tools (sequential thinking, mental models, debugging approaches, decision frameworks, scientific method, structured argumentation) to any MCP-compatible AI client.
#v(3pt)
#proj("oz-ai", "keyless multi-provider LLM client", link("https://github.com/chirag127/oz-ai")[chirag127/oz-ai])
- Browser-side LLM client wrapping g4f/gpt4free with multi-provider failover — no API key required. Powers all oriz.in AI features.
#v(3pt)
#proj("Stochastic-Thinking MCP Server", "TypeScript · probabilistic reasoning", link("https://github.com/chirag127")[github.com/chirag127])
- MCP server for probabilistic / stochastic reasoning steps in AI workflows.

#section("Experience — AI at Work")
#entry("Software Engineer (AI tooling)", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Built a hybrid-RAG search and documentation system over the SAP CPQ knowledge base (100+ videos, 40+ decks) — dense embeddings + BM25 + reranking on SAP-approved Hyperspace AI — cutting ticket-resolution and onboarding time.
- Automate testing, CI/CD, and configuration validation workflows in Python; React dashboards for real-time visibility.
- KT search knowledge base (Cloud Quote) ongoing — practical applied-RAG in a large enterprise context.
#v(4pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Python, Node.js, MongoDB platform; Apache Kafka event-driven order pipeline; Razorpay HMAC-verified webhooks.

#section("Qualification & Certifications")
#entry("B.Tech, Computer Science & Engineering", "AKTU", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1). JEE Advanced 2020 — AIR 11870 (top 1%).
#v(3pt)
*Certifications:* Claude Certified Associate — Foundations, Anthropic (2026) · 20+ Udemy Business courses (Claude Code, MCP, Generative AI, ML, EU AI Act) via TCS.

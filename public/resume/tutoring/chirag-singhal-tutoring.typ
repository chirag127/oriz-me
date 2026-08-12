// Chirag Singhal — Tutoring résumé
// Compile: typst compile chirag-singhal-tutoring.typ chirag-singhal-tutoring.pdf
#set document(title: "Chirag Singhal — Tutor", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[Tutor — Programming · JEE/Maths · English · JEE Advanced AIR 11870 · B.Tech CSE Rank 1] \
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
JEE Advanced 2020 AIR 11870 (top 1%, ~1M+ aspirants). B.Tech CSE college topper (Rank 1), AKTU. I tutor programming (Python, JavaScript, web dev, data structures), JEE/CBSE mathematics, and spoken/written English. I learn by building real things, so I teach that way — concrete projects and problems over memorisation. Patient, structured, results-focused. Available for 1-on-1 and small-group sessions, flexible scheduling. Rate: \$15–40/hr.

#section("Tutoring Subjects & Approach")
*Programming:* Python (beginner to intermediate — variables, loops, functions, OOP, projects), JavaScript and web development (HTML/CSS/JS, React fundamentals), data structures & algorithms (arrays, linked lists, trees, sorting, searching), beginner-friendly intro to AI/ML concepts \
*Mathematics:* JEE Advanced / JEE Main preparation (Algebra, Calculus, Coordinate Geometry, Probability, Vectors, 3D), CBSE 11th/12th Mathematics, school/competitive maths, problem-solving strategies \
*English:* spoken English fluency, written communication (emails, essays, reports), grammar, vocabulary, exam preparation (IELTS/TOEFL concepts) \
*Teaching philosophy:* explain first principles, not shortcuts; build real mini-projects in coding sessions; use past papers and worked examples in maths; structure each session with a clear goal and a takeaway exercise

#section("Credentials — Why Trust My Teaching")
- *JEE Advanced 2020* — All India Rank 11870 (top 1% of ~1M+ aspirants). Cleared both JEE Main and JEE Advanced. Deep working knowledge of IIT-JEE Mathematics and the competitive-exam mindset.
- *B.Tech CSE, AKTU (2020–2024)* — College Topper, Rank 1. Covered algorithms, data structures, operating systems, databases, software engineering, and applied mathematics at degree level.
- *Senior Secondary (CBSE)* — 97%. Strong foundation across Maths, Physics, Chemistry, and English.
- *Claude Certified Associate — Foundations*, Anthropic (2026). Fluent in modern AI tools — can teach students how to learn with AI productively rather than depend on it.
- *20+ technical courses* (Udemy Business via TCS) — AI/LLM, Machine Learning, Python, Agile. Keeps teaching current.

#section("What I Build (Shows I Know the Material)")
#proj("agent-forge", "Python · multi-agent · 67 tests", link("https://github.com/chirag127/agent-forge")[chirag127/agent-forge])
- Multi-agent LLM framework in Python: planner/executor/critic, JSON-schema tool-calling, provider failover, LLM-as-judge eval suite. Demonstrates advanced Python and system design.
#v(3pt)
#proj("rag-lens", "Python · RAG · information retrieval", link("https://github.com/chirag127/rag-lens")[chirag127/rag-lens])
- Production RAG pipeline: dense search, BM25, RRF fusion, reranking, FastAPI. Shows Python at depth.
#v(3pt)
#proj("oriz.in", "Astro · React · TypeScript · 10+ live tools", link("https://oriz.in")[oriz.in])
- Family of free web tools built solo end-to-end — web dev, APIs, deployment. Living proof of full-stack teaching material.
#v(3pt)
#proj("Clear-Thought MCP Server", "36★ · TypeScript", link("https://github.com/chirag127/Clear-Thought-MCP-server")[chirag127/Clear-Thought-MCP-server])
- Open-source TypeScript project with real-world GitHub usage — good teaching example for TS/Node.js students.

#section("Professional Experience")
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Enterprise software engineering on SAP CPQ; Python automation, React dashboards, CI/CD, Agile team.
#v(4pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Full-stack food-commerce platform: Python, Node.js, MongoDB, Kafka, Redis, Razorpay.

#section("Qualification")
#entry("B.Tech, Computer Science & Engineering", "AKTU", "Uttar Pradesh", "2020 – 2024")
- *College Topper, Rank 1.* Senior Secondary (CBSE) — 97%.
#v(3pt)
*JEE Advanced 2020 — All India Rank 11870 (top 1%).* \ Claude Certified Associate — Foundations, Anthropic (2026).

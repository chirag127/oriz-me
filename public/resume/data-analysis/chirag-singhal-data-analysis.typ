// Chirag Singhal — Data Analysis résumé
// Compile: typst compile chirag-singhal-data-analysis.typ chirag-singhal-data-analysis.pdf
#set document(title: "Chirag Singhal — Data Analyst", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[Data Analyst — Python · SQL · Dashboards · ETL Pipelines · Reporting] \
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
I turn messy data into clear answers. Python (pandas/numpy) + SQL + dashboards, framed around the decision you actually need to make. I build automated data pipelines — scraping, scheduled refresh, git-as-DB — so reports stay current without manual effort. Strong at exploratory analysis, metrics design, and concise written delivery. B.Tech CSE college topper; 3+ years shipping data pipelines, dashboards, and backend systems in production. Rate: \$30–70/hr.

#section("Data & Analytics Skills")
*Analysis:* data cleaning and wrangling, exploratory data analysis (EDA), statistical analysis, metrics design, cohort analysis, trend detection, anomaly flagging \
*Python:* pandas, numpy, scipy, matplotlib, requests, BeautifulSoup, Playwright (web scraping), schedule/cron pipelines \
*SQL & databases:* PostgreSQL (Neon/pgx), MySQL, SQLite (Turso edge), MongoDB, query optimisation, indexing \
*Dashboards & BI:* React dashboards, data visualization (charts, time-series, gauges), Google Sheets / Excel automation \
*Pipelines & ETL:* web scraping (httpx, Playwright), REST API ingestion, scheduled git-as-DB storage, Cloudflare Workers automation, Redis caching \
*Delivery:* clear written reports, reproducible notebooks, actionable summaries for non-technical stakeholders

#section("Data Projects — Proof of Work")
#proj("oriz-ipo", "live IPO data pipeline · Python · hourly", link("https://oriz.in")[oriz.in])
- Hourly IPO GMP (Grey Market Premium) scraper, normalizer, and signal pipeline: raw web data → cleaned series → momentum signal → automated Git commit (git-as-DB) → Telegram + ntfy push alerts. Fully automated, production.
#v(3pt)
#proj("oriz-mmi", "Market Mood Index data pipeline · Python", link("https://oriz.in")[oriz.in])
- Polls Tickertape MMI API hourly, stores fear/greed history, visualizes the gauge, and alerts on regime transitions. Demonstrates end-to-end API-to-dashboard pipeline with scheduled refresh.
#v(3pt)
#proj("flow-fii-dii-activity", "FII/DII flow tracker · Python", link("https://github.com/chirag127/flow-fii-dii-activity")[chirag127/flow-fii-dii-activity])
- Daily NSE FII/DII net buy/sell data: automated scraping, historical series storage, trend visualization.
#v(3pt)
#proj("portfolio-lab", "portfolio analytics · Python · optimization", link("https://portfolio-lab.oriz.in")[portfolio-lab.oriz.in])
- Max-Sharpe portfolio optimizer: cleans price data, computes covariance matrix, runs scipy optimization, outputs risk/return decomposition. Includes a rigorous empirical analysis validating assumptions.
#v(3pt)
#proj("rag-lens", "retrieval analytics · Python · eval metrics", link("https://github.com/chirag127/rag-lens")[chirag127/rag-lens])
- Production information-retrieval pipeline with a full evaluation suite: Recall\@k, MRR, nDCG computed on every run; OpenTelemetry spans for latency profiling.
#v(3pt)
#proj("oriz.in live-data APIs", "Astro · Cloudflare Workers · multiple trackers", link("https://oriz.in")[oriz.in])
- Family of free, live-data tools on oriz.in — each backed by a scheduled Python pipeline delivering fresh data to the browser without a server.

#section("Experience")
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Built hybrid-RAG search over a 100+ video / 40+ deck knowledge base; designed the ingestion pipeline, chunking strategy, and retrieval eval suite.
- Python automation for pricing/configuration validation; React dashboards surfacing backend metrics to business stakeholders; CI/CD pipelines for quality gates.
#v(4pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- MongoDB data model and query optimisation for a high-traffic food-commerce platform; Redis caching cut API latency; Apache Kafka pipeline tracked order state across distributed outlets; Razorpay transaction reconciliation.

#section("Qualification")
#entry("B.Tech, Computer Science & Engineering", "AKTU", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1). Senior Secondary (CBSE) — 97%.
#v(3pt)
*Honors:* JEE Advanced 2020 — AIR 11870 (top 1%). Claude Certified Associate, Anthropic (2026).

// Chirag Singhal — Financial Analysis résumé
// Compile: typst compile chirag-singhal-finance.typ chirag-singhal-finance.pdf
#set document(title: "Chirag Singhal — Financial Analyst", author: "Chirag Singhal")
#set page(paper: "a4", margin: (x: 1.5cm, y: 1.2cm))
#set text(font: ("Arial", "Liberation Sans", "Helvetica"), size: 10pt, fill: rgb("#1a1a1a"))
#set par(justify: true, leading: 0.6em)
#set list(spacing: 0.65em, indent: 3pt)
#show list: set block(spacing: 0.65em)

#let accent = rgb("#14532d")

#align(center)[
  #text(size: 23pt, weight: "bold", fill: accent)[Chirag Singhal] \
  #v(2pt)
  #text(size: 10pt, weight: "medium")[Financial Analyst — Markets · Valuation · Portfolio Optimization · Data-Driven Research] \
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
Data-driven markets analyst. I build valuation models, portfolio optimizers, and live market-signal tools — and deliver the analysis as working, reproducible code, not slides. I analyze equities and markets with real tooling: max-Sharpe portfolio optimization, Nifty/index valuation (PE, Buffett indicator, MMI fear/greed), IPO GMP tracking, and mutual-fund screening. I translate raw market data into clear buy/hold signals and reproducible Python reports. Comfortable explaining findings to non-technical clients. Rate: \$30–60/hr.

#section("Financial Analysis Skills")
*Analysis:* equity valuation, portfolio optimization (max-Sharpe / Modern Portfolio Theory), technical analysis (support/resistance, trend), fundamental analysis (PE, P/B, Buffett indicator), market-microstructure signals (FII/DII flow, MMI fear/greed) \
*Financial modeling:* Python (pandas/numpy/scipy), Excel / Google Sheets financial models, discounted cash flow, mutual-fund screening \
*Data & reporting:* live-data API integration (NSE, market data providers), automated scheduled pipelines, reproducible research notebooks, data visualization, clear written/verbal delivery \
*Markets covered:* Indian equities (NSE/BSE), IPO GMP, Nifty index valuation, mutual funds, macro indicators

#section("Finance Projects — Proof of Work")
#proj("portfolio-lab", "max-Sharpe optimizer · Python · Astro", link("https://portfolio-lab.oriz.in")[portfolio-lab.oriz.in])
- Interactive max-Sharpe portfolio optimization studio: given a basket of Indian stocks/ETFs, computes the efficient frontier, identifies the max-Sharpe allocation, and shows forward-looking risk/return decomposition. Backed by a rigorous empirical analysis debunking an assumed 20%-P2P premise.
#v(3pt)
#proj("oriz-ipo", "live IPO GMP tracker · Python · hourly", link("https://oriz.in")[oriz.in])
- Hourly IPO GMP (Grey Market Premium) analyzer: scrapes, normalizes, and signals IPO momentum; automated Git-as-DB storage; Telegram + ntfy push alerts. Production, runs continuously.
#v(3pt)
#proj("oriz-mmi", "Market Mood Index tracker · Python · hourly", link("https://oriz.in")[oriz.in])
- Hourly Tickertape MMI fear/greed gauge: polls api.tickertape.in/mmi/now, stores history, visualizes the fear/greed dial, and alerts on regime changes. Keyless, fully automated.
#v(3pt)
#proj("oriz-nifty-signal", "Nifty valuation signals · Python", link("https://oriz.in")[oriz.in])
- Nifty index valuation tracker: PE ratio history, Buffett indicator (market-cap/GDP), and composite buy/hold signal. Reproducible Python pipeline, scheduled refresh.
#v(3pt)
#proj("flow-fii-dii-activity", "FII/DII flow monitor · Python", link("https://github.com/chirag127/flow-fii-dii-activity")[chirag127/flow-fii-dii-activity])
- Automated daily tracker of NSE FII and DII net buy/sell activity; historical series + trend alerts.

#section("Experience — Analytical & Data Work")
#entry("Software Engineer", "Tata Consultancy Services", "Bhubaneswar", "Jun 2025 – Present")
- Built a hybrid-RAG search + documentation system over a large enterprise knowledge base — information retrieval, data pipeline, and reporting; cut resolution times for a 20+ functional-area CPQ platform.
- Automate configuration validation, pricing logic, and CI/CD in Python across a complex multi-stakeholder system; React dashboards surface real-time backend state to business users.
#v(4pt)
#entry("Software Developer — Full Stack", "QRsay.com", "Remote", "Jul 2023 – May 2025")
- Designed event-driven order-processing pipeline (Apache Kafka) tracking financial transactions across distributed outlets; Razorpay payment integration with HMAC-verified reconciliation.
- Query optimisation and Redis caching cut API latency; modular dashboards presented operational metrics to business stakeholders.

#section("Qualification & Honors")
#entry("B.Tech, Computer Science & Engineering", "AKTU", "Uttar Pradesh", "2020 – 2024")
- College Topper (Rank 1). Senior Secondary (CBSE) — 97%.
#v(3pt)
*Honors:* JEE Advanced 2020 — AIR 11870 (top 1%, ~1M+ aspirants). Claude Certified Associate, Anthropic (2026).

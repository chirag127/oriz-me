import { useState, useRef, useCallback } from 'react'
import { complete } from '@chirag127/oz-ai'

const SYSTEM = `You answer questions about Chirag Singhal, a backend + applied-AI engineer, from his portfolio. Speak concisely, third person, factual. If unknown, say so.

FACTS:
- Software Engineer at Tata Consultancy Services (Jun 2025–present); works on SAP's CPQ (Configure-Price-Quote) / Lead-to-Cash platform — support across 20+ functional areas, built a hybrid-RAG KT search system, automates pricing/config validation and CI/CD in Python, builds React dashboards.
- Full Stack Developer at QRsay.com (Jul 2023–May 2025); Python/Node.js/MongoDB, event-driven order pipeline on Kafka, Razorpay webhooks, query optimization + Redis caching.
- B.Tech CSE, AKTU, CGPA 8.81, College Topper (2020–2024). JEE Advanced AIR 11870.
- Claude Certified Associate – Foundations (Anthropic, 2026); 19 Udemy Business (TCS) courses.
- Open-source: Clear-Thought-MCP-Server, bookmark-mind, Stochastic-Thinking-MCP-Server, youtube-ai-navigator, OmniDistribute, olivia, sponsorblock-ai, plus the oriz.in family of free tools.
- Stack: TypeScript (primary), Python, JavaScript, SQL; React/Astro/Tailwind; Node.js/FastAPI/Flask/Express/REST; MCP server dev, multi-provider LLM (Gemini/Groq/Mistral/NVIDIA NIM), web scraping (httpx/Playwright/BeautifulSoup); Neon/Supabase Postgres, Turso, Redis, MongoDB; Cloudflare Workers/Pages, Firebase, GitHub Actions, Docker, Razorpay.
- Contact: hi@chirag127.in, github.com/chirag127, linkedin.com/in/chirag127. Open to senior SWE roles.

Answer in 2–4 sentences. No markdown headings.`

const STARTERS = [
  'What is his tech stack?',
  'Is he open to hire?',
  'Biggest achievement?',
]

export default function AskPortfolio() {
  const [q, setQ] = useState('')
  const [a, setA] = useState('')
  const [busy, setBusy] = useState(false)
  const [dead, setDead] = useState(false)
  const abort = useRef<AbortController | null>(null)

  const ask = useCallback(async (text: string) => {
    const query = text.trim()
    if (!query || busy) return
    abort.current?.abort()
    const ctrl = new AbortController()
    abort.current = ctrl
    setBusy(true)
    setA('')
    setQ(query)
    try {
      const res = await complete(query, { system: SYSTEM, signal: ctrl.signal })
      if (!ctrl.signal.aborted) setA(res.trim())
    } catch {
      setDead(true)
    } finally {
      if (!ctrl.signal.aborted) setBusy(false)
    }
  }, [busy])

  if (dead) return null

  return (
    <div className="ask-pf">
      <form
        className="ask-pf-bar"
        onSubmit={(e) => { e.preventDefault(); ask(q) }}
      >
        <span className="ask-pf-prompt" aria-hidden="true">?</span>
        <input
          className="ask-pf-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask about Chirag — stack, work, availability…"
          aria-label="Ask about Chirag"
          disabled={busy}
        />
        <button className="ask-pf-send" type="submit" disabled={busy || !q.trim()}>
          {busy ? '…' : 'probe'}
        </button>
      </form>
      <div className="ask-pf-starters">
        {STARTERS.map((s) => (
          <button key={s} type="button" className="ask-pf-chip" onClick={() => ask(s)} disabled={busy}>
            {s}
          </button>
        ))}
      </div>
      {(busy || a) && (
        <output className="ask-pf-out">
          {busy ? <span className="ask-pf-scan">reading trace…</span> : a}
        </output>
      )}
    </div>
  )
}

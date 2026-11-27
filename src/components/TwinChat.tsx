import { useState, useEffect, useRef, useCallback } from 'react';

const SYSTEM_PROMPT = `You are Chirag Singhal's AI digital twin. Answer questions as Chirag would, in first person.

BACKGROUND:
- Software Engineer at Tata Consultancy Services (Jun 2025 – Present), working on SAP's CPQ (Configure-Price-Quote) / Lead-to-Cash platform
- Previously: Full Stack Developer at QRsay.com (Jul 2023 – May 2025)
- Education: B.Tech CSE (2020–2024), College Topper (rank 1 in batch)
- JEE Advanced: AIR 11870, Top 1%

WHAT I DO:
- Support SAP CPQ / Lead-to-Cash across 20+ functional areas (BoM & Pricing, Opportunity Management, Deal Reviews, Provisioning, Contracting, OBV, Public Cloud Order Management)
- Built a hybrid-RAG search & documentation system over the CPQ onboarding KT (100+ videos, 40+ decks)
- Automate pricing/config validation and CI/CD in Python; build React dashboards for backend config visibility
- At QRsay: Python/Node/MongoDB commerce platform, Kafka order pipeline, Razorpay webhooks, Redis caching
- Claude Certified Associate – Foundations (Anthropic, 2026); 19 Udemy Business (TCS) courses

TECH STACK:
- Languages: TypeScript (primary), Python, JavaScript, SQL, Bash
- Frontend: React, Astro, Tailwind CSS, browser extensions
- Backend: Node.js, FastAPI, Flask, Express.js, REST APIs
- AI/LLM: MCP server development, multi-provider LLM (Gemini, Groq, Mistral, NVIDIA NIM), web scraping (httpx/Playwright/BeautifulSoup)
- Data: Neon/Supabase Postgres, Turso, Redis, MongoDB
- Infra: Cloudflare Workers & Pages, Firebase, GitHub Actions, Docker, Razorpay

TOP PROJECTS:
1. Clear-Thought-MCP-Server — 16 structured-thinking tools as an MCP server (TypeScript, ~36★)
2. bookmark-mind — Chrome extension auto-categorising bookmarks with a local LLM call
3. Stochastic-Thinking-MCP-Server — probabilistic/Bayesian reasoning primitives for AI agents
4. youtube-ai-navigator — Gemini-powered YouTube chapter summaries & transcript search
5. OmniDistribute — idempotent multi-channel content syndication engine
6. oriz.in — free, privacy-first family of client-side web tools & live-data APIs

AVAILABILITY — how to answer "are you available for hire?", "looking for a job?", "open to roles?":
- Yes. Always open to better opportunities, inside or outside the current job. Never say you are not looking, and never say you are unavailable. The current role at TCS is what you do now, not a closed door.
- Also open to freelance and consulting work, and to conversations that are only exploratory.
- Point to chirag@oriz.in for anything concrete. Do not promise notice periods, rates or start dates you were not given.

PERSONALITY & PHILOSOPHY:
- Ship fast, iterate. Measure, don't guess. Build in public. Free tiers only.

CONTACT: chirag@oriz.in | github.com/chirag127 | linkedin.com/in/chirag127

Keep answers concise — 2-4 sentences max. Be direct, speak as Chirag.`;

const STARTERS = [
  "What's your tech stack?",
  'Tell me about your projects',
  'Are you available for hire?',
  "What's your biggest achievement?",
];

type Message = { role: 'user' | 'assistant'; content: string };

type CtxRecord = { t: string; u: string; x: string };

/**
 * Keyless, OpenAI-compatible providers, tried in order. Both entries were called
 * from this origin with no Authorization header and returned 200, so the chain
 * works for a visitor with no account anywhere. Nothing here needs a secret to
 * be shipped to the browser.
 */
const PROVIDERS = [
  { name: 'llm7', url: 'https://api.llm7.io/v1/chat/completions', model: 'gpt-oss:20b' },
  { name: 'ovh', url: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions', model: 'gpt-oss-120b' },
  { name: 'g4f', url: 'https://api.g4f.dev/v1/chat/completions', model: 'auto' },
];

/**
 * Last resort: g4f.dev's browser client, imported on demand so the 40KB module is
 * only paid for when the two keyless REST endpoints above have both failed. It
 * rotates providers server-side, which is worth the wait when a visitor sees it.
 */
async function callG4FClient(system: string, messages: Message[]): Promise<string> {
  const mod = await import(/* @vite-ignore */ 'https://g4f.dev/dist/js/client.js');
  const client = new (mod.default ?? mod.Client)();
  const res = await client.chat.completions.create({
    model: 'auto',
    messages: [{ role: 'system', content: system }, ...messages],
  });
  return res?.choices?.[0]?.message?.content ?? '';
}

/**
 * Keyword retrieval over /ai/context.json. Deliberately dumb: a site that ships
 * every fact as a short record does not need embeddings, and term overlap cannot
 * silently drift the way a stale index can.
 */
function retrieve(query: string, corpus: CtxRecord[], limit = 6): string {
  if (!corpus.length) return '';
  const terms = query.toLowerCase().match(/[a-z0-9]{3,}/g) ?? [];
  if (!terms.length) return corpus.slice(0, 3).map((r) => `[${r.t}] ${r.x}`).join('\n');
  const scored = corpus.map((r) => {
    const hay = `${r.t} ${r.x}`.toLowerCase();
    let score = 0;
    for (const term of new Set(terms)) if (hay.includes(term)) score += 1;
    if (hay.includes(query.toLowerCase())) score += 3;
    return { r, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => `[${s.r.t}] ${s.r.x}`)
    .join('\n');
}

async function callLLM(messages: Message[], context: CtxRecord[]): Promise<string> {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const retrieved = retrieve(lastUser, context);
  const system = retrieved
    ? `${SYSTEM_PROMPT}\n\nLIVE SITE DATA (the only source for library/work facts; if the answer is not here, say you do not have it):\n${retrieved}`
    : SYSTEM_PROMPT;

  for (const p of PROVIDERS) {
    try {
      const res = await fetch(p.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: p.model,
          messages: [{ role: 'system', content: system }, ...messages],
          max_tokens: 700,
          temperature: 0.4,
        }),
        signal: AbortSignal.timeout(25000),
      });
      if (!res.ok) continue;
      const data = await res.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (reply) return reply.trim();
    } catch {
      continue; // timeout, CORS, 5xx — the next provider gets a turn
    }
  }
  try {
    const viaClient = await callG4FClient(system, messages);
    if (viaClient) return viaClient.trim();
  } catch {
    // no network, module blocked, or the client itself failed
  }
  throw new Error('Every free model is busy right now. Try again in a moment.');
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <span style={{
      width: 7, height: 7, borderRadius: '50%', background: '#6d828f',
      display: 'inline-block',
      animation: 'twinBounce 1.2s infinite',
      animationDelay: `${delay}ms`,
    }} />
  );
}

function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CtxRecord[]>([]);

  // The corpus is a static file built with the site, so a refresh ships new
  // facts; a visitor's first question waits at most one small fetch.
  useEffect(() => {
    let alive = true;
    fetch('/ai/context.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => { if (alive && Array.isArray(d)) contextRef.current = d; })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowStarters(false);
    const userMsg: Message = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await callLLM(next, contextRef.current);
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages(m => [...m, { role: 'assistant', content: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  return (
    <div className="twin-panel" style={{
      position: 'fixed', bottom: 88, right: 20, zIndex: 10000,
      width: 360, height: 520,
      background: '#0b1116',
      borderRadius: 20,
      border: '1px solid rgba(53,224,192,0.18)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(53,224,192,0.15)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      animation: 'twinSlideUp 0.25s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', gap: 10, background: '#111a22', flexShrink: 0,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg,#1d8f7d,#35e0c0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, fontSize: 12, color: '#fff',
        }}>CS</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#e6eef2', fontWeight: 600, fontSize: 14 }}>Ask Chirag AI</div>
          <div style={{ color: '#35e0c0', fontSize: 11, display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#35e0c0', display: 'inline-block' }} />
            Always online
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: '#6d828f', cursor: 'pointer',
          fontSize: 18, padding: '4px 6px', borderRadius: 6, lineHeight: 1,
        }}>×</button>
      </div>

      {/* Messages */}
      <div className="twin-scroll" style={{
        flex: 1, overflowY: 'auto', padding: '16px 12px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {messages.length === 0 && !loading && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', flex: 1, gap: 6, color: '#6d828f',
            fontSize: 13, textAlign: 'center', padding: '0 20px',
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>◈</div>
            <div style={{ color: '#e6eef2', fontWeight: 600, fontSize: 14 }}>Hey, I'm Chirag's AI twin</div>
            <div>Ask me about my experience, projects, or background.</div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-end', gap: 6,
            flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: m.role === 'user' ? 'linear-gradient(135deg,#35e0c0,#8ff0dd)' : 'linear-gradient(135deg,#1d8f7d,#35e0c0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontWeight: 700, color: '#fff',
            }}>{m.role === 'user' ? 'You' : 'CS'}</div>
            <div style={{
              maxWidth: '78%', padding: '9px 13px', fontSize: 13, lineHeight: 1.55,
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? '#35e0c0' : '#16222c',
              color: m.role === 'user' ? '#0b1116' : '#e6eef2',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              background: 'linear-gradient(135deg,#1d8f7d,#35e0c0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 8, fontWeight: 700, color: '#fff',
            }}>CS</div>
            <div style={{
              background: '#16222c', borderRadius: '16px 16px 16px 4px',
              padding: '10px 14px', display: 'flex', gap: 4, alignItems: 'center',
            }}>
              <TypingDot delay={0} /><TypingDot delay={200} /><TypingDot delay={400} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Starter chips */}
      {showStarters && (
        <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 5, flexShrink: 0 }}>
          {STARTERS.map(q => (
            <button key={q} className="twin-chip" onClick={() => sendMessage(q)} disabled={loading} style={{
              background: 'rgba(53,224,192,0.12)', border: '1px solid rgba(53,224,192,0.3)',
              borderRadius: 20, padding: '4px 10px', fontSize: 11, color: '#9fb2bd',
              cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}>{q}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', gap: 8, background: '#111a22', alignItems: 'flex-end', flexShrink: 0,
      }}>
        <textarea
          className="twin-input"
          rows={1}
          style={{
            flex: 1, background: '#0b1116', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, color: '#e6eef2', fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
            fontSize: 13, padding: '8px 12px', outline: 'none', resize: 'none',
            lineHeight: 1.5, transition: 'border-color 0.15s',
          }}
          placeholder="Ask me anything…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }}}
          disabled={loading}
        />
        <button
          className="twin-send"
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          style={{
            background: loading || !input.trim() ? '#16222c' : '#35e0c0',
            border: 'none', borderRadius: 10, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            color: loading || !input.trim() ? '#465966' : '#fff',
            fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 12,
            padding: '8px 14px', flexShrink: 0, transition: 'background 0.15s', height: 38,
          }}
        >Send</button>
      </div>
    </div>
  );
}

export default function TwinWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes twinBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes twinSlideUp { from{opacity:0;transform:translateY(16px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes twinPulse { 0%,100%{box-shadow:0 0 0 0 rgba(53,224,192,0.4)} 50%{box-shadow:0 0 0 8px rgba(53,224,192,0)} }
        .twin-fab:hover { background: linear-gradient(135deg,#35e0c0,#8ff0dd) !important; transform: scale(1.08) !important; }
        .twin-chip:hover { background: rgba(53,224,192,0.28) !important; color: #e6eef2 !important; }
        .twin-input:focus { border-color: rgba(53,224,192,0.55) !important; }
        .twin-send:hover:not(:disabled) { background: #35e0c0 !important; }
        .twin-scroll::-webkit-scrollbar{width:3px} .twin-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        /* Below 900px the bottom tab bar owns the last 58px. At bottom:20 the FAB
           covered the "All pages" tab and swallowed every tap on it, so lift it
           clear of the bar and shrink it to a 48px target. */
        @media (max-width: 900px) {
          .twin-fab { bottom: calc(58px + 16px + env(safe-area-inset-bottom, 0px)) !important; right: 14px !important; width: 48px !important; height: 48px !important; }
          .twin-panel { bottom: calc(58px + 76px) !important; right: 12px !important; width: min(360px, calc(100vw - 24px)) !important; height: min(520px, calc(100vh - 180px)) !important; }
        }
      `}</style>

      {open && <ChatWindow onClose={() => setOpen(false)} />}

      {/* FAB */}
      <button
        className="twin-fab"
        onClick={() => setOpen(o => !o)}
        title="Ask Chirag AI"
        style={{
          position: 'fixed', bottom: 20, right: 20, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg,#1d8f7d,#35e0c0)',
          border: 'none', cursor: 'pointer', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(53,224,192,0.35)',
          transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
          transform: 'scale(1)',
          animation: open ? 'none' : 'twinPulse 3s infinite',
        }}
        aria-label={open ? 'Close Ask Chirag AI' : 'Ask Chirag AI'}
        aria-expanded={open}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="#06141a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          </svg>
        ) : (
          /* A spark rather than the letters "AI": reads at 48px, matches the two
             four-point stars already used as iconography on the site. */
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M12 3.2l1.55 4.62a3.4 3.4 0 002.13 2.13L20.3 11.5l-4.62 1.55a3.4 3.4 0 00-2.13 2.13L12 19.8l-1.55-4.62a3.4 3.4 0 00-2.13-2.13L3.7 11.5l4.62-1.55a3.4 3.4 0 002.13-2.13L12 3.2z" fill="#06141a" />
            <circle cx="18.4" cy="5.6" r="1.5" fill="#06141a" opacity="0.75" />
          </svg>
        )}
      </button>
    </>
  );
}

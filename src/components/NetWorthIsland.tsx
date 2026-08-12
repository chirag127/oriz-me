import { ClerkProvider, SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined
const OWNER_EMAIL = import.meta.env.PUBLIC_OWNER_EMAIL || 'whyiswhen@gmail.com'

const appearance = {
  variables: {
    colorPrimary: '#35e0c0',
    colorText: '#e6eef2',
    colorTextSecondary: '#9fb2bd',
    colorBackground: '#111a22',
    colorInputBackground: '#0b1116',
    colorInputText: '#e6eef2',
    colorDanger: '#f2a65a',
    borderRadius: '6px',
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
  },
  elements: {
    card: { backgroundColor: '#111a22', border: '1px solid rgba(120,160,175,0.14)' },
    headerTitle: { fontFamily: "'Space Grotesk', system-ui, sans-serif", color: '#e6eef2' },
    formButtonPrimary: {
      backgroundColor: '#35e0c0',
      color: '#0b1116',
      fontFamily: "'IBM Plex Mono', monospace",
      fontWeight: '600',
      textTransform: 'none' as const,
    },
    footerActionLink: { color: '#35e0c0' },
  },
} as const

interface NetWorthData {
  generated: string
  i2i: {
    totalAmountInvested: number
    totalCredit: number
    fundAvailable: number
    currentValue: number
    totalReceivedTillDate: number
    activeLoans: number
    closedLoans: number
    totalLoans: number
    totalInvestmentActiveOnLoan: number
    avgIntRate: string
  }
  indmoney: {
    total_networth: number
    mf: number
    savings_account: number
    gold: number
    silver: number
    liabilities: number
  }
  total: number
}

function fmt(n: number) {
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
}

function PieChart({ i2iVal, indVal }: { i2iVal: number; indVal: number }) {
  const total = i2iVal + indVal
  const i2iPct = (i2iVal / total) * 100
  // SVG donut: radius 40, cx/cy 50
  const r = 40
  const circ = 2 * Math.PI * r
  const i2iDash = (i2iPct / 100) * circ
  return (
    <div className="nw-pie-wrap">
      <svg viewBox="0 0 100 100" className="nw-pie" aria-hidden="true">
        {/* background ring */}
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(120,160,175,0.14)" strokeWidth="14" />
        {/* INDmoney slice (starts at top, goes CW) */}
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="#f2a65a" strokeWidth="14"
          strokeDasharray={`${circ - i2iDash} ${i2iDash}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="butt"
        />
        {/* i2i slice */}
        <circle
          cx="50" cy="50" r={r} fill="none"
          stroke="#35e0c0" strokeWidth="14"
          strokeDasharray={`${i2iDash} ${circ - i2iDash}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="butt"
        />
        <text x="50" y="46" textAnchor="middle" fontSize="10" fill="#e6eef2" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
          {i2iPct.toFixed(1)}%
        </text>
        <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#9fb2bd" fontFamily="IBM Plex Mono, monospace">
          P2P
        </text>
      </svg>
      <div className="nw-pie-legend">
        <div className="nw-pie-item">
          <span className="nw-pie-dot nw-pie-dot--p2p" />
          <span>i2iFunding P2P — {i2iPct.toFixed(1)}%</span>
        </div>
        <div className="nw-pie-item">
          <span className="nw-pie-dot nw-pie-dot--ind" />
          <span>INDmoney — {(100 - i2iPct).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}

function Dashboard({ data }: { data: NetWorthData }) {
  const { i2i, indmoney, total } = data
  return (
    <div className="nw-root">
      {/* Total */}
      <div className="nw-total-card card-glow">
        <div className="nw-total-label">TOTAL NET WORTH</div>
        <div className="nw-total-val">{fmt(total)}</div>
        <div className="nw-total-sub">as of {data.generated} · point-in-time snapshot</div>
      </div>

      {/* Pie */}
      <PieChart i2iVal={i2i.currentValue} indVal={indmoney.total_networth} />

      {/* Two panels */}
      <div className="nw-grid">

        {/* i2i panel */}
        <section className="nw-panel card">
          <div className="nw-panel-head">
            <span className="kicker" style={{ marginBottom: 0 }}>P2P LENDING</span>
            <span className="nw-platform">i2iFunding</span>
          </div>
          <div className="nw-panel-total">{fmt(i2i.currentValue)}</div>
          <div className="nw-panel-sub">current value (principal + idle)</div>
          <hr className="divider" style={{ margin: '14px 0' }} />
          <dl className="nw-dl">
            <div className="nw-dl-row">
              <dt>Principal deployed</dt><dd>{fmt(i2i.totalAmountInvested)}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Idle (escrow)</dt><dd>{fmt(i2i.fundAvailable)}</dd>
            </div>
            <div className="nw-dl-row nw-dl-row--highlight">
              <dt>Interest earned (lifetime)</dt><dd>{fmt(i2i.totalReceivedTillDate)}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Active loans</dt><dd>{i2i.activeLoans}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Closed loans</dt><dd>{i2i.closedLoans}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Avg interest rate</dt><dd>{i2i.avgIntRate}%</dd>
            </div>
          </dl>
          <div className="nw-note">
            LendenClub not connected — 403 / no data available.
          </div>
        </section>

        {/* INDmoney panel */}
        <section className="nw-panel card">
          <div className="nw-panel-head">
            <span className="kicker" style={{ marginBottom: 0 }}>PORTFOLIO</span>
            <span className="nw-platform">INDmoney</span>
          </div>
          <div className="nw-panel-total">{fmt(indmoney.total_networth)}</div>
          <div className="nw-panel-sub">net worth (MF + banks + commodities)</div>
          <hr className="divider" style={{ margin: '14px 0' }} />
          <dl className="nw-dl">
            <div className="nw-dl-row nw-dl-row--highlight">
              <dt>Mutual Funds</dt><dd>{fmt(indmoney.mf)}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Savings account</dt><dd>{fmt(indmoney.savings_account)}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Gold</dt><dd>{fmt(indmoney.gold)}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Silver</dt><dd>{fmt(indmoney.silver)}</dd>
            </div>
            <div className="nw-dl-row">
              <dt>Liabilities</dt><dd>{fmt(indmoney.liabilities)}</dd>
            </div>
          </dl>
        </section>

      </div>

      <style>{`
        .nw-root { display: flex; flex-direction: column; gap: 1.5rem; }

        .nw-total-card {
          padding: 28px 28px 22px;
          background: linear-gradient(135deg, rgba(53,224,192,0.06) 0%, transparent 60%), var(--panel);
          border-color: rgba(53,224,192,0.25);
        }
        .nw-total-label {
          font-family: var(--font-mono); font-size: 9.5px; text-transform: uppercase;
          letter-spacing: 0.22em; color: var(--phosphor); margin-bottom: 8px;
        }
        .nw-total-val {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(2.4rem, 5vw, 3.4rem); line-height: 1;
          letter-spacing: -0.03em; color: var(--ink);
          font-variant-numeric: tabular-nums;
        }
        .nw-total-sub {
          font-family: var(--font-mono); font-size: 10px; color: var(--ink-4); margin-top: 8px;
        }

        .nw-pie-wrap {
          display: flex; align-items: center; gap: 24px;
          padding: 18px 22px; background: var(--panel);
          border: 1px solid var(--hair); border-radius: var(--r-md);
        }
        .nw-pie { width: 100px; height: 100px; flex-shrink: 0; }
        .nw-pie-legend { display: flex; flex-direction: column; gap: 10px; }
        .nw-pie-item {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 11px; color: var(--ink-2);
        }
        .nw-pie-dot {
          width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0;
        }
        .nw-pie-dot--p2p { background: var(--phosphor); box-shadow: 0 0 6px var(--phosphor-glow); }
        .nw-pie-dot--ind  { background: var(--amber); box-shadow: 0 0 6px rgba(242,166,90,0.3); }

        .nw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 700px) { .nw-grid { grid-template-columns: 1fr; } }

        .nw-panel { display: flex; flex-direction: column; }
        .nw-panel-head {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 10px;
        }
        .nw-platform {
          font-family: var(--font-mono); font-size: 10px;
          color: var(--phosphor); letter-spacing: 0.08em;
          background: color-mix(in srgb, var(--phosphor) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--phosphor) 25%, transparent);
          padding: 2px 8px; border-radius: var(--r-sm);
        }
        .nw-panel-total {
          font-family: var(--font-display); font-weight: 700; font-size: 1.9rem;
          color: var(--ink); letter-spacing: -0.02em; line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .nw-panel-sub {
          font-family: var(--font-mono); font-size: 10px; color: var(--ink-4); margin-top: 5px;
        }

        .nw-dl { display: flex; flex-direction: column; gap: 0; }
        .nw-dl-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 7px 0; border-bottom: 1px solid rgba(120,160,175,0.08);
          font-family: var(--font-mono); font-size: 11.5px;
        }
        .nw-dl-row:last-child { border-bottom: none; }
        .nw-dl-row dt { color: var(--ink-3); }
        .nw-dl-row dd { color: var(--ink); font-weight: 600; font-variant-numeric: tabular-nums; }
        .nw-dl-row--highlight dt { color: var(--phosphor); }
        .nw-dl-row--highlight dd { color: var(--phosphor); }

        .nw-note {
          margin-top: 12px; font-family: var(--font-mono); font-size: 10px;
          color: var(--ink-4); border-top: 1px solid var(--hair); padding-top: 10px;
        }
      `}</style>
    </div>
  )
}

function Gate() {
  return (
    <SignInButton mode="modal">
      <button
        type="button"
        style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '13px',
          color: '#35e0c0',
          background: 'rgba(53,224,192,0.08)',
          border: '1px solid rgba(53,224,192,0.25)',
          borderRadius: '6px',
          padding: '10px 20px',
          cursor: 'pointer',
        }}
      >
        Sign in to view
      </button>
    </SignInButton>
  )
}

function OwnerContent() {
  const { user } = useUser()
  const [data, setData] = useState<NetWorthData | null>(null)
  const [err, setErr] = useState('')

  const email = user?.primaryEmailAddress?.emailAddress ?? ''
  const isOwner = email === OWNER_EMAIL

  useEffect(() => {
    if (!isOwner) return
    fetch('/data/networth.json')
      .then(r => {
        if (!r.ok) throw new Error('data unavailable')
        return r.json()
      })
      .then(setData)
      .catch(() => setErr('Net worth data not available in this build.'))
  }, [isOwner])

  if (!isOwner) {
    return (
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#9fb2bd' }}>
        Private — restricted to owner.
      </p>
    )
  }
  if (err) {
    return (
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#9fb2bd' }}>
        {err}
      </p>
    )
  }
  if (!data) {
    return (
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#465966', animation: 'nw-blink 1.2s step-end infinite' }}>
        Loading…
        <style>{`@keyframes nw-blink{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
      </p>
    )
  }
  return <Dashboard data={data} />
}

export default function NetWorthIsland() {
  if (!publishableKey) {
    return (
      <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#9fb2bd' }}>
        Sign-in not configured on this build.
      </p>
    )
  }
  return (
    <ClerkProvider publishableKey={publishableKey} appearance={appearance}>
      <SignedOut>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
          <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#6d828f' }}>
            Private page — owner access only.
          </p>
          <Gate />
        </div>
      </SignedOut>
      <SignedIn>
        <OwnerContent />
      </SignedIn>
    </ClerkProvider>
  )
}

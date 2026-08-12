// Client script: fetches live GitHub repos and reconciles DOM with live data.
// Baked HTML is the instant render + no-JS fallback; this script only enriches it.

const GH_USER = 'chirag127'
const LANG_COLORS: Record<string, string> = {
  Python: '#3b82f6', JavaScript: '#eab308', TypeScript: '#3b82f6',
  Go: '#06b6d4', Rust: '#f97316', HTML: '#f97316', CSS: '#8b5cf6',
  Shell: '#10b981', Vue: '#10b981', Svelte: '#f97316', Java: '#f97316',
  'C++': '#6366f1', C: '#6366f1', Ruby: '#f43f5e', PHP: '#8b5cf6',
}

function langColor(lang: string): string {
  return LANG_COLORS[lang] || '#6b7280'
}

function relDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const diffDays = Math.floor((Date.now() - d.getTime()) / 86_400_000)
  if (diffDays < 1) return 'today'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`
  return `${Math.floor(diffDays / 365)}y ago`
}

async function fetchAllRepos(): Promise<any[]> {
  const results: any[] = []
  for (const page of [1, 2]) {
    const url = `https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100&page=${page}`
    const r = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
    if (!r.ok) throw new Error(`${r.status}`)
    const batch: any[] = await r.json()
    results.push(...batch)
    if (batch.length < 100) break
  }
  return results
}

function repoCardHTML(repo: any): string {
  const lc = repo.language ? langColor(repo.language) : ''
  const badge = repo.language
    ? `<span class="lang-badge" style="background:${lc}20;color:${lc};border-color:${lc}40">${repo.language}</span>`
    : ''
  const topics = (repo.topics ?? []).slice(0, 3)
    .map((t: string) => `<span class="chip">${t}</span>`).join('')
  const topicsRow = topics ? `<div class="topics-row">${topics}</div>` : ''
  return `<div class="repo-top">
    <span class="repo-name">${repo.name}</span>${badge}
  </div>
  <p class="repo-desc">${repo.description || 'No description'}</p>
  ${topicsRow}
  <div class="repo-meta">
    <span class="repo-stat">★ ${repo.stargazers_count}</span>
    <span class="repo-sep">·</span>
    <span class="repo-date">${relDate(repo.pushed_at)}</span>
  </div>`
}

function tableRowHTML(repo: any): string {
  const lc = repo.language ? langColor(repo.language) : ''
  const dot = repo.language ? `<span class="lang-dot" style="background:${lc}"></span>` : ''
  return `<span class="table-name">${repo.name}</span>
  <span class="table-lang">${dot}${repo.language || '—'}</span>
  <span class="table-stars">★ ${repo.stargazers_count}</span>
  <span class="table-date">${relDate(repo.pushed_at)}</span>`
}

function setLiveIndicator(ts: Date) {
  const el = document.getElementById('gh-live-indicator')
  if (el) {
    el.textContent = `LIVE · ${ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    el.style.opacity = '1'
  }
}

async function hydrate() {
  let all: any[]
  try {
    all = await fetchAllRepos()
  } catch {
    return // rate-limited or offline — baked data stays
  }

  const own = all.filter(r => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count)
  if (own.length === 0) return

  const featured = own.slice(0, 6)
  const rest = own.slice(6)
  const totalStars = own.reduce((s, r) => s + (r.stargazers_count || 0), 0)

  // Update stats in profile card
  const statEls = document.querySelectorAll<HTMLElement>('.gh-stat strong')
  // [0]=repos [1]=followers [2]=stars [3]=npm-packages (leave npm alone)
  if (statEls[0]) statEls[0].textContent = String(all.length)
  if (statEls[2]) statEls[2].textContent = String(totalStars)

  // Update page subtitle repo count
  const sub = document.querySelector<HTMLElement>('.page-subtitle')
  if (sub) sub.textContent = `${all.length}+ repos on GitHub.`

  // Update featured repo cards
  const cards = document.querySelectorAll<HTMLAnchorElement>('.repos-grid .repo-card')
  featured.forEach((repo, i) => {
    const card = cards[i]
    if (!card) return
    card.href = repo.html_url
    card.innerHTML = repoCardHTML(repo)
  })

  // Update all-repos table rows (skip header)
  const table = document.querySelector('.repos-table')
  if (table) {
    // Update kicker count
    const kicCount = table.previousElementSibling?.querySelector('.kicker-count')
    if (kicCount) kicCount.textContent = `(${own.length} total)`

    const rows = table.querySelectorAll<HTMLAnchorElement>('.table-row')
    // Reconcile existing rows
    rest.forEach((repo, i) => {
      if (rows[i]) {
        rows[i].href = repo.html_url
        rows[i].innerHTML = tableRowHTML(repo)
      }
    })
    // Add extra rows if live has more than baked
    if (rest.length > rows.length) {
      const frag = document.createDocumentFragment()
      rest.slice(rows.length).forEach(repo => {
        const a = document.createElement('a')
        a.href = repo.html_url
        a.target = '_blank'
        a.rel = 'noopener'
        a.className = 'table-row'
        a.innerHTML = tableRowHTML(repo)
        frag.appendChild(a)
      })
      table.appendChild(frag)
    }
  }

  setLiveIndicator(new Date())
}

hydrate()

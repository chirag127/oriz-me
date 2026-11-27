/**
 * Builds /ai/context.json — the retrieval corpus for "Ask Chirag AI".
 *
 * One record per fact, each small enough that a dozen fit in a prompt. The chat
 * widget scores records against the question with plain term overlap and sends
 * the best few; nothing here is paraphrased by a model, so a stale snapshot shows
 * as stale rather than as a confident invention.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const DATA = 'public/data'
const OUT = 'public/ai/context.json'
const read = (f) => {
  const p = join(DATA, f)
  if (!existsSync(p)) return null
  try { return JSON.parse(readFileSync(p, 'utf-8')) } catch { return null }
}
const arr = (f) => { const d = read(f); return Array.isArray(d) ? d : [] }

const records = []
const add = (title, url, text) => {
  const clean = String(text ?? '').replace(/\s+/g, ' ').trim()
  if (clean) records.push({ t: title, u: url, x: clean.slice(0, 600) })
}

// ── Identity, stated once and edited by hand ────────────────────────────────
add('Who Chirag is', '/me/', 'Chirag Singhal is a backend and applied AI engineer. This site is a personal dashboard: work history, a media library, and notes. Contact: chirag@oriz.in.')
add('What the site is', '/', 'me.oriz.in is Chirag\'s personal site and live dashboard. Every library section is fed by real API snapshots, refreshed on a schedule, not typed by hand.')

// ── GitHub ─────────────────────────────────────────────────────────────────
const ghUser = read('github-user.json')
if (ghUser) add('GitHub profile', '/work/open-source/', `${ghUser.public_repos ?? '?'} public repositories, ${ghUser.followers ?? '?'} followers. ${ghUser.bio ?? ''}`)
const repos = arr('github-repos.json').slice(0, 40)
if (repos.length) {
  add('Top GitHub repositories', '/work/open-source/', repos
    .map((r) => `${r.name}${r.language ? ` (${r.language})` : ''}${r.stargazers_count ? ` ★${r.stargazers_count}` : ''}: ${r.description ?? 'no description'}`)
    .join(' | '))
}

// ── Books ──────────────────────────────────────────────────────────────────
const bookLine = (b) => {
  const t = b.title ?? b.book?.title ?? ''
  const a = b.author ?? b.author_name ?? b.contributions?.map((c) => c.author?.name).join(', ') ?? ''
  return a ? `${t} by ${a}` : t
}
for (const [file, label, url] of [
  ['hardcover-read.json', 'Books read', '/library/books/read/'],
  ['hardcover-want.json', 'Books on the want-to-read shelf', '/library/books/want-to-read/'],
  ['hardcover-reading.json', 'Books currently being read', '/library/books/reading/'],
]) {
  const rows = arr(file).map(bookLine).filter(Boolean)
  if (rows.length) add(label, url, `${rows.length}: ${rows.join('; ')}`)
}

// ── Anime, manga, film, TV ─────────────────────────────────────────────────
for (const [file, label, url] of [
  ['anilist-anime-completed.json', 'Anime finished', '/library/anime/completed/'],
  ['anilist-anime-plan.json', 'Anime planned', '/library/anime/plan-to-watch/'],
  ['anilist-manga-completed.json', 'Manga finished', '/library/manga/completed/'],
  ['trakt-movies.json', 'Films watched', '/library/movies/watched/'],
  ['trakt-shows.json', 'TV shows tracked', '/library/tv/'],
]) {
  const rows = arr(file).map((r) => r.title ?? r.movie?.title ?? r.show?.title ?? '').filter(Boolean)
  if (rows.length) add(label, url, `${rows.length}: ${rows.slice(0, 40).join(', ')}`)
}

// ── Writing and video ──────────────────────────────────────────────────────
const posts = arr('blog-posts.json').slice(0, 15)
if (posts.length) add('Blog posts', '/work/blog/', posts.map((p) => p.title).filter(Boolean).join('; '))
const devto = arr('devto-articles.json').slice(0, 15)
if (devto.length) add('Dev.to articles', '/work/blog/', devto.map((p) => p.title).filter(Boolean).join('; '))
const yt = arr('youtube-recent.json').slice(0, 15)
if (yt.length) add('Recent YouTube videos', '/library/videos/', yt.map((v) => v.title ?? v.snippet?.title).filter(Boolean).join('; '))

// ── Sources, so the assistant can answer "why is this empty" ────────────────
add('Data sources', '/me/sources/', 'Every shelf is fed by a third-party API and each one can fail independently. /me/sources lists each service, the file it writes, and whether it is reporting, empty, or unavailable, with the measured reason. Trakt, WakaTime, Toggl, Spotify, Reddit and BoardGameGeek are currently unavailable.')

mkdirSync('public/ai', { recursive: true })
writeFileSync(OUT, JSON.stringify(records, null, 0))
const bytes = JSON.stringify(records).length
console.log(`  ✓ ${OUT} — ${records.length} records, ${(bytes / 1024).toFixed(1)} KB`)

/**
 * Every third-party service the build talks to, what it puts on the site, and
 * what it needs to work. The /me/sources page reads this list and reports the
 * state measured at the last data refresh, so a dead feed is visible instead of
 * looking like an empty library.
 *
 * `known` is only for services probed by hand and found broken; without it the
 * state is derived from whether the snapshot files have rows.
 */
export type SourceState = 'live' | 'empty' | 'unavailable'
export type SourceAuth = 'none' | 'key' | 'token' | 'oauth'

export interface Source {
  id: string
  name: string
  group: 'Books' | 'Anime & manga' | 'Film & TV' | 'Music' | 'Games' | 'Work & life'
  /** Snapshot files in public/data that this service writes. */
  feeds: string[]
  /** Where a reader can check the same data by hand. */
  site: string
  auth: SourceAuth
  known?: { state: SourceState; note: string }
}

export const SOURCES: Source[] = [
  // Books
  { id: 'hardcover', name: 'Hardcover', group: 'Books', auth: 'token', site: 'https://hardcover.app/@chirag127',
    feeds: ['hardcover-read.json', 'hardcover-want.json', 'hardcover-reading.json', 'hardcover-dnf.json'] },
  { id: 'openlibrary', name: 'Open Library', group: 'Books', auth: 'none', site: 'https://openlibrary.org',
    feeds: ['ol-read.json', 'ol-reading.json', 'ol-want.json'],
    known: { state: 'unavailable', note: 'No account under this handle, and Open Library shelves are private by default.' } },
  { id: 'goodreads', name: 'Goodreads', group: 'Books', auth: 'none', site: 'https://www.goodreads.com',
    feeds: ['goodreads-read.json', 'goodreads-currently-reading.json', 'goodreads-to-read.json'],
    known: { state: 'unavailable', note: 'Goodreads retired its public API in 2020; these files are archived imports.' } },
  { id: 'bgg', name: 'BoardGameGeek', group: 'Games', auth: 'token', site: 'https://boardgamegeek.com',
    feeds: ['bgg-collection.json'],
    known: { state: 'unavailable', note: 'Collection endpoint answers 401 without a bearer token.' } },

  // Anime & manga
  { id: 'anilist', name: 'AniList', group: 'Anime & manga', auth: 'none', site: 'https://anilist.co/user/chirag127',
    feeds: ['anilist-anime-completed.json', 'anilist-anime-plan.json', 'anilist-anime-watching.json', 'anilist-manga-completed.json'] },
  { id: 'mal', name: 'MyAnimeList', group: 'Anime & manga', auth: 'key', site: 'https://myanimelist.net/profile/chirag127',
    feeds: ['mal-anime-completed.json', 'mal-anime-plan.json', 'mal-anime-watching.json', 'mal-manga-completed.json', 'mal-manga-plan.json'] },
  { id: 'jikan', name: 'Jikan', group: 'Anime & manga', auth: 'none', site: 'https://jikan.moe',
    feeds: ['jikan-anime-completed.json', 'jikan-manga-completed.json'],
    known: { state: 'unavailable', note: 'Unreachable from this network; AniList carries the same list instead.' } },

  // Film & TV
  { id: 'trakt', name: 'Trakt', group: 'Film & TV', auth: 'token', site: 'https://trakt.tv/users/chirag127',
    feeds: ['trakt-movies.json', 'trakt-shows.json', 'trakt-stats.json', 'trakt-watchlist.json'],
    known: { state: 'unavailable', note: 'Answers 403 even on public endpoints with the current client id; needs a re-registered app or a new token.' } },
  { id: 'tmdb', name: 'TMDB', group: 'Film & TV', auth: 'token', site: 'https://www.themoviedb.org',
    feeds: ['tmdb-trending-movies.json', 'tmdb-popular-tv.json', 'tmdb-top-rated-movies.json', 'tmdb-on-the-air.json'] },
  { id: 'podcastindex', name: 'Podcast Index', group: 'Film & TV', auth: 'key', site: 'https://podcastindex.org',
    feeds: ['podcasts-enriched.json'],
    known: { state: 'unavailable', note: 'No key in the environment, so only the hand-maintained podcast list is shown.' } },

  // Music
  { id: 'lastfm', name: 'Last.fm', group: 'Music', auth: 'key', site: 'https://www.last.fm/user/lastfmwhy',
    feeds: ['lastfm-recent.json', 'lastfm-top-artists.json', 'lastfm-top-tracks.json', 'lastfm-user.json'] },
  { id: 'listenbrainz', name: 'ListenBrainz', group: 'Music', auth: 'none', site: 'https://listenbrainz.org/user/chirag127',
    feeds: ['lb-recent.json', 'lb-stats-all.json', 'lb-playing-now.json'] },
  { id: 'spotify', name: 'Spotify', group: 'Music', auth: 'oauth', site: 'https://open.spotify.com',
    feeds: ['spotify-top-artists.json', 'spotify-top-tracks.json'],
    known: { state: 'unavailable', note: 'Token refresh answers 400; the refresh token was revoked and needs re-authorising.' } },

  // Games
  { id: 'igdb', name: 'IGDB', group: 'Games', auth: 'oauth', site: 'https://www.igdb.com',
    feeds: ['games-enriched.json'],
    known: { state: 'unavailable', note: 'No Twitch client credentials in the environment.' } },
  { id: 'steam', name: 'Steam', group: 'Games', auth: 'key', site: 'https://steamcommunity.com',
    feeds: ['games-manual.json'],
    known: { state: 'unavailable', note: 'Needs a Web API key and a numeric SteamID; neither is set.' } },

  // Work & life
  { id: 'github', name: 'GitHub', group: 'Work & life', auth: 'none', site: 'https://github.com/chirag127',
    feeds: ['github-repos.json', 'github-user.json'] },
  { id: 'npm', name: 'npm', group: 'Work & life', auth: 'none', site: 'https://www.npmjs.com/~chirag127',
    feeds: ['npm-packages.json'] },
  { id: 'devto', name: 'DEV', group: 'Work & life', auth: 'none', site: 'https://dev.to',
    feeds: ['devto-articles.json'] },
  { id: 'hashnode', name: 'Hashnode', group: 'Work & life', auth: 'none', site: 'https://hashnode.com',
    feeds: ['hashnode-articles.json'],
    known: { state: 'unavailable', note: 'The public API was retired; the endpoint now returns HTML.' } },
  { id: 'wakatime', name: 'WakaTime', group: 'Work & life', auth: 'key', site: 'https://wakatime.com/@chirag127',
    feeds: ['wakatime-stats-7d.json', 'wakatime-stats-30d.json', 'wakatime-all-time.json', 'wakatime-projects.json'],
    known: { state: 'unavailable', note: 'Answers 401; the API key was rotated or revoked.' } },
  { id: 'toggl', name: 'Toggl', group: 'Work & life', auth: 'token', site: 'https://track.toggl.com',
    feeds: ['toggl-recent.json', 'toggl-summary.json'],
    known: { state: 'unavailable', note: 'Answers 400 for the current token.' } },
  { id: 'habitica', name: 'Habitica', group: 'Work & life', auth: 'token', site: 'https://habitica.com',
    feeds: ['habitica-dailies.json', 'habitica-habits.json', 'habitica-todos.json', 'habitica-user.json'] },
  { id: 'notion', name: 'Notion', group: 'Work & life', auth: 'token', site: 'https://notion.so',
    feeds: ['notion-journal.json', 'notion-stats.json'] },
  { id: 'google', name: 'Google', group: 'Work & life', auth: 'oauth', site: 'https://myaccount.google.com',
    feeds: ['gmail-inbox.json', 'maps-places.json', 'fit-daily.json'],
    known: { state: 'unavailable', note: 'OAuth refresh produced no access token, so Gmail, Maps and Fit stay empty.' } },
  { id: 'reddit', name: 'Reddit', group: 'Work & life', auth: 'oauth', site: 'https://www.reddit.com/user/chirag127',
    feeds: ['reddit-posts.json', 'reddit-profile.json'],
    known: { state: 'unavailable', note: 'The public JSON endpoints answer 403 without an OAuth app.' } },
  { id: 'lanyard', name: 'Lanyard', group: 'Work & life', auth: 'none', site: 'https://lanyard.rest',
    feeds: ['lanyard.json'] },
  { id: 'youtube', name: 'YouTube', group: 'Work & life', auth: 'none', site: 'https://www.youtube.com/@ChiragSinghal127',
    feeds: ['youtube-recent.json', 'youtube-subscriptions.json', 'youtube-stats.json'] },
  { id: 'moonreader', name: 'Moon+ Reader', group: 'Books', auth: 'none', site: 'https://www.moondownload.com',
    feeds: ['moonreader-books.json'],
    known: { state: 'empty', note: 'Fills only when a Moon+ backup zip is dropped into public/data.' } },
]

export const GROUP_ORDER: Source['group'][] = ['Books', 'Anime & manga', 'Film & TV', 'Music', 'Games', 'Work & life']

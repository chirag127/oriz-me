/**
 * Single source of identity for the site. Every value is a PUBLIC_* build-time
 * env var with today's live value as the fallback, so a fork with no .env looks
 * identical to me.oriz.in and a fork with a .env is a different person's site.
 *
 * Only PUBLIC_* vars belong here: this module is imported by client islands, and
 * Astro inlines PUBLIC_* (and only PUBLIC_*) into the browser bundle.
 */
const env = import.meta.env

// Trailing slash stripped so `${SITE.url}${path}` never doubles up.
const url = (env.PUBLIC_SITE_URL || 'https://me.oriz.in').replace(/\/+$/, '')

export const SITE = {
  url,
  name: env.PUBLIC_OWNER_NAME || 'Chirag Singhal',
  /** Derived so a rename needs one env var, not an initials edit. */
  initials:
    env.PUBLIC_OWNER_INITIALS ||
    (env.PUBLIC_OWNER_NAME || 'Chirag Singhal')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() ?? '')
      .join(''),
  role: env.PUBLIC_OWNER_ROLE || 'Software Engineer',
  email: env.PUBLIC_OWNER_EMAIL || 'chirag@oriz.in',
  employer: env.PUBLIC_OWNER_EMPLOYER || 'Tata Consultancy Services',
  github: env.PUBLIC_OWNER_GITHUB || 'chirag127',
  linkedin: env.PUBLIC_OWNER_LINKEDIN || 'chirag127',
  x: env.PUBLIC_OWNER_X || 'chirag127',
  familyName: env.PUBLIC_FAMILY_NAME || 'oriz.in',
  familyUrl: env.PUBLIC_FAMILY_URL || 'https://oriz.in',
  /** Empty string disables the Plausible snippet instead of publishing to someone else's domain. */
  analyticsDomain: env.PUBLIC_ANALYTICS_DOMAIN || '',
  hireMe: env.PUBLIC_HIRE_ME !== 'false',
}

export const GITHUB_URL = `https://github.com/${SITE.github}`
export const LINKEDIN_URL = `https://www.linkedin.com/in/${SITE.linkedin}/`
export const X_URL = `https://x.com/${SITE.x}`

export const DEFAULT_DESCRIPTION = `${SITE.name} — ${SITE.role} · Backend · AI Systems · Open Source`

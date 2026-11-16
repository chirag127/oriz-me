// @ts-check
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadEnv } from 'vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'
import { defineConfig } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// astro.config runs before Vite's import.meta.env exists, so identity has to be
// read here through loadEnv (which does read .env files, unlike process.env).
const env = loadEnv(process.env.NODE_ENV ?? 'production', __dirname, '')
const site = (env.PUBLIC_SITE_URL || 'https://me.oriz.in').replace(/\/+$/, '')
// GitHub Pages serves a project site from /<repo>/, so the mirror build needs a
// base path. Unset for the Cloudflare deploy, which serves from the root.
const base = process.env.GH_PAGES_BASE || '/'
const ownerName = env.PUBLIC_OWNER_NAME || 'Chirag Singhal'
const ownerRole = env.PUBLIC_OWNER_ROLE || 'Software Engineer'
const description = `${ownerName} — ${ownerRole} · Backend · AI Systems · Open Source`

export default defineConfig({
	site,
	base,
	integrations: [
		react(),
		sitemap(),
		AstroPWA({
			registerType: 'autoUpdate',
			injectRegister: false,
			includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
			manifest: {
				id: '/',
				name: `${ownerName} — Instrument Bench`,
				short_name: ownerName.split(/\s+/)[0],
				description,
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#35e0c0',
				background_color: '#0b1116',
				icons: [
					{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
					{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
					{ src: '/icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
					{ src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
				navigateFallback: null,
				runtimeCaching: [
					{
						urlPattern: ({ url }) => url.pathname.startsWith('/data/'),
						handler: 'NetworkOnly',
					},
					{
						urlPattern: ({ url }) => url.origin !== self.location.origin,
						handler: 'NetworkOnly',
					},
				],
			},
		}),
	],
	output: 'static',
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				'~': path.resolve(__dirname, 'src'),
			},
		},
	},
})

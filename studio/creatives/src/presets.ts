export type CreativeSize = {
  width: number
  height: number
  label: string
}

// --- SNS / OGP ---
export const OGP: CreativeSize = { width: 1200, height: 630, label: 'OGP' }
export const OGP_SQUARE: CreativeSize = { width: 1200, height: 1200, label: 'OGP Square' }

// --- Instagram ---
export const IG_SQUARE: CreativeSize = { width: 1080, height: 1080, label: 'Instagram Square' }
export const IG_PORTRAIT: CreativeSize = { width: 1080, height: 1350, label: 'Instagram Portrait' }
export const IG_STORY: CreativeSize = { width: 1080, height: 1920, label: 'Instagram Story' }

// --- X (Twitter) ---
export const X_POST: CreativeSize = { width: 1200, height: 675, label: 'X Post' }
export const X_HEADER: CreativeSize = { width: 1500, height: 500, label: 'X Header' }

// --- YouTube ---
export const YT_THUMBNAIL: CreativeSize = { width: 1280, height: 720, label: 'YouTube Thumbnail' }
export const YT_BANNER: CreativeSize = { width: 2560, height: 1440, label: 'YouTube Banner' }

// --- Google Ads ---
export const GDN_LEADERBOARD: CreativeSize = { width: 728, height: 90, label: 'GDN Leaderboard' }
export const GDN_RECTANGLE: CreativeSize = { width: 300, height: 250, label: 'GDN Rectangle' }
export const GDN_LARGE_RECTANGLE: CreativeSize = { width: 336, height: 280, label: 'GDN Large Rectangle' }
export const GDN_SKYSCRAPER: CreativeSize = { width: 160, height: 600, label: 'GDN Skyscraper' }

// --- General ---
export const HD: CreativeSize = { width: 1920, height: 1080, label: 'Full HD' }
export const A4_LANDSCAPE: CreativeSize = { width: 1754, height: 1240, label: 'A4 Landscape (150dpi)' }

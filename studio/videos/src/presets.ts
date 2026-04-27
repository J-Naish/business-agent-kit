export type VideoSize = {
  width: number
  height: number
  fps: number
  label: string
}

// --- Standard ---
export const HD: VideoSize = { width: 1920, height: 1080, fps: 30, label: 'Full HD 16:9' }
export const HD_60: VideoSize = { width: 1920, height: 1080, fps: 60, label: 'Full HD 16:9 60fps' }
export const HD_VERTICAL: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'Full HD 9:16' }
export const HD_720: VideoSize = { width: 1280, height: 720, fps: 30, label: 'HD 720p' }
export const SQUARE: VideoSize = { width: 1080, height: 1080, fps: 30, label: 'Square 1:1' }
export const UHD_4K: VideoSize = { width: 3840, height: 2160, fps: 30, label: '4K UHD' }

// --- YouTube ---
export const YT_STANDARD: VideoSize = { width: 1920, height: 1080, fps: 30, label: 'YouTube Standard' }
export const YT_SHORTS: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'YouTube Shorts' }

// --- Instagram ---
export const IG_REELS: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'Instagram Reels' }
export const IG_FEED_SQUARE: VideoSize = { width: 1080, height: 1080, fps: 30, label: 'Instagram Feed Square' }
export const IG_FEED_PORTRAIT: VideoSize = { width: 1080, height: 1350, fps: 30, label: 'Instagram Feed Portrait' }
export const IG_FEED_LANDSCAPE: VideoSize = { width: 1080, height: 566, fps: 30, label: 'Instagram Feed Landscape' }
export const IG_STORY: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'Instagram Story' }

// --- TikTok ---
export const TIKTOK: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'TikTok' }

// --- X (Twitter) ---
export const X_LANDSCAPE: VideoSize = { width: 1920, height: 1080, fps: 30, label: 'X Landscape' }
export const X_PORTRAIT: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'X Portrait' }
export const X_SQUARE: VideoSize = { width: 1080, height: 1080, fps: 30, label: 'X Square' }

// --- Facebook ---
export const FB_FEED: VideoSize = { width: 1080, height: 1080, fps: 30, label: 'Facebook Feed' }
export const FB_REELS: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'Facebook Reels' }
export const FB_IN_STREAM: VideoSize = { width: 1920, height: 1080, fps: 30, label: 'Facebook In-Stream' }

// --- Google Ads ---
export const GOOGLE_LANDSCAPE: VideoSize = { width: 1920, height: 1080, fps: 30, label: 'Google Ads Landscape' }
export const GOOGLE_PORTRAIT: VideoSize = { width: 1080, height: 1920, fps: 30, label: 'Google Ads Portrait' }
export const GOOGLE_SQUARE: VideoSize = { width: 1080, height: 1080, fps: 30, label: 'Google Ads Square' }
export const GOOGLE_BUMPER: VideoSize = { width: 1920, height: 1080, fps: 30, label: 'Google Bumper Ad (6s)' }

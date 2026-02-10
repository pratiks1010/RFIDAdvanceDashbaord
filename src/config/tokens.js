/**
 * Design tokens - single source for spacing, breakpoints, etc. used in JS.
 * CSS tokens live in src/styles/globals.css (:root and .dark).
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const spacing = {
  page: 16,
  section: 24,
  card: 20,
  touch: 44,
}

export const themeStorageKey = 'rfid-dashboard-theme'

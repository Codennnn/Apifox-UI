import type { Config } from 'tailwindcss'

export default {
  content: ['./src/{app,components}/**/*.{js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {},

      padding: {
        layoutHeader: 'var(--layout-header-height)',
        main: 'var(--p-main)',
        tabContent: 'var(--p-tab-content)',
      },

      margin: {
        tabContent: 'var(--p-tab-content)',
      },
    },
  },

  corePlugins: {
    preflight: false,
  },
} satisfies Config

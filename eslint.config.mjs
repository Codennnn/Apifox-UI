import nextPreset from 'prefer-code-style/eslint/preset/next'

export default [
  ...nextPreset,

  {
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 0,
    },
  },

  {
    settings: {
      tailwindcss: {
        whitelist: ['ant-tree-switcher-icon', 'ui-menu-controls', 'ui-tabs-tab-label'],
      },
    },
  },
]

import { defaultThemeSetting } from './theme-data'
import type { ThemeSetting } from './ThemeEditor.type'

export const storeThemeSetting = (autoSaveId: string, newThemeSetting: ThemeSetting): void => {
  window.localStorage.setItem(autoSaveId, JSON.stringify(newThemeSetting))
}

export const restoreThemeSetting = (autoSaveId: string | undefined): ThemeSetting => {
  if (autoSaveId) {
    const storage = window.localStorage.getItem(autoSaveId)

    if (storage) {
      return JSON.parse(storage) as ThemeSetting
    }
  }

  return defaultThemeSetting
}

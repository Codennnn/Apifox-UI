import type { GlobalToken } from 'antd'

export type ThemeMode = 'lightDefault' | 'darkDefault' | 'lark'

export interface ThemeSetting {
  themeMode: ThemeMode
  colorPrimary: GlobalToken['colorPrimary']
  borderRadius: GlobalToken['borderRadius']
  spaceType: 'default' | 'compact'
}

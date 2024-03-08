import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { setTwoToneColor } from '@ant-design/icons'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'

import { presetThemes } from './theme-data'
import { restoreThemeSetting } from './ThemeEditor.helper'
import type { ThemeSetting } from './ThemeEditor.type'

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme

interface ThemeContextData {
  themeSetting: ThemeSetting
  setThemeSetting: React.Dispatch<React.SetStateAction<ThemeSetting>>
  autoSaveId: string | undefined
  isDarkMode: boolean
}

const ThemeContext = createContext({} as ThemeContextData)

interface ThemeProviderProps {
  initialValue: ThemeSetting
  /**
   * 存储配置的 Key。
   * 如果提供了，会将主题配置自动保存到本地，然后通过这个 Key 获取到相应的配置。
   */
  autoSaveId?: ThemeContextData['autoSaveId']
}

export function ThemeProvider(props: React.PropsWithChildren<ThemeProviderProps>) {
  const { token } = theme.useToken()

  const { children, initialValue, autoSaveId } = props

  const [themeSetting, setThemeSetting] = useState<ThemeSetting>(initialValue)

  const { themeMode, colorPrimary, borderRadius, spaceType } = themeSetting

  const isDarkMode = themeMode === 'darkDefault'

  const algorithm = useMemo(() => {
    const algorithms = [isDarkMode ? darkAlgorithm : defaultAlgorithm]

    if (spaceType === 'compact') {
      algorithms.push(compactAlgorithm)
    }

    return algorithms
  }, [isDarkMode, spaceType])

  const themePresetTokens = useMemo(() => {
    const isDefaultTheme = themeMode === 'lightDefault' || themeMode === 'darkDefault'
    const token = presetThemes[themeMode].token
    return { ...token, ...(isDefaultTheme ? { colorPrimary, borderRadius } : {}) }
  }, [themeMode, colorPrimary, borderRadius])

  useEffect(() => {
    document.documentElement.setAttribute('theme', themeMode)
  }, [themeMode])

  useEffect(() => {
    if (themePresetTokens.colorPrimary) {
      // 主色变更后，也更新双色图标的主色。
      setTwoToneColor(themePresetTokens.colorPrimary)
    }
  }, [themePresetTokens.colorPrimary])

  return (
    <ThemeContext.Provider value={{ themeSetting, setThemeSetting, autoSaveId, isDarkMode }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm,
          token: { ...themePresetTokens },
          components: {
            Modal: { colorBgMask: isDarkMode ? token.colorBgMask : 'rgb(255 255 255 / 0.72)' },
            Tooltip:
              themeMode !== 'darkDefault'
                ? {
                    colorTextLightSolid: token.colorText,
                    colorBgSpotlight: token.colorBgContainer,
                  }
                : undefined,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export function ThemeProviderClient(
  props: React.PropsWithChildren<Pick<ThemeProviderProps, 'autoSaveId'>>
) {
  const { children, autoSaveId } = props

  const [themeSetting, setThemeSetting] = useState<ThemeSetting>()

  useEffect(() => {
    setThemeSetting(restoreThemeSetting(autoSaveId))
  }, [autoSaveId])

  // 等待获取到主题配置后再渲染，防止主题切换闪烁。
  if (!themeSetting) {
    return null
  }

  return (
    <ThemeProvider autoSaveId={autoSaveId} initialValue={themeSetting}>
      {children}
    </ThemeProvider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)

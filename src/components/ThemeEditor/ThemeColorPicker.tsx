import { Space, theme } from 'antd'

import { presetColors } from './theme-data'
import { useThemeContext } from './ThemeContext'
import type { ThemeSetting } from './ThemeEditor.type'

interface ThemeColorPickerProps {
  value?: ThemeSetting['colorPrimary']
  onChange?: (value: ThemeColorPickerProps['value']) => void
}

export function ThemeColorPicker(props: ThemeColorPickerProps) {
  const { token } = theme.useToken()

  const { value, onChange } = props

  const { themeSetting } = useThemeContext()
  const { themeMode } = themeSetting
  const isDefaultTheme = themeMode === 'lightDefault' || themeMode === 'darkDefault'

  return (
    <Space wrap className="pl-2 pt-[6px]" size={token.paddingLG}>
      {presetColors.map((color) => {
        const matched = isDefaultTheme && color === value

        return (
          <span
            key={color}
            className={`inline-block size-5 items-center rounded-full ${
              matched ? 'cursor-default' : 'cursor-pointer'
            }`}
            style={{
              opacity: isDefaultTheme ? 1 : 0.5,
              pointerEvents: isDefaultTheme ? 'auto' : 'none',
              backgroundColor: color,
              boxShadow: matched
                ? `0 0 0 1px ${token.colorBgContainer}, 0px 0px 0px 5px ${color}`
                : 'none',
            }}
            onClick={() => onChange?.(color)}
          />
        )
      })}
    </Space>
  )
}

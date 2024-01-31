import { Space, theme } from 'antd'

import { presetThemes } from './theme-data'

interface ThemePickerProps {
  value?: string
  onChange?: (value: ThemePickerProps['value']) => void
}

export function ThemePicker(props: ThemePickerProps) {
  const { token } = theme.useToken()

  const { value, onChange } = props

  return (
    <Space wrap size={token.paddingLG}>
      {Object.entries(presetThemes).map(([themeName, { preview, name }]) => {
        const matched = themeName === value

        return (
          <Space
            key={themeName}
            align="center"
            className={matched ? 'cursor-default' : 'cursor-pointer'}
            direction="vertical"
            onClick={() => {
              onChange?.(themeName)
            }}
          >
            <div
              className="h-[80px] w-[120px] overflow-hidden"
              style={{
                borderRadius: token.borderRadiusLG,
                boxShadow: matched
                  ? `0 0 0 2px ${token.colorBgContainer}, 0 0 0 5px ${token.colorPrimary}`
                  : 'none',
              }}
            >
              {preview}
            </div>
            <span>{name}</span>
          </Space>
        )
      })}
    </Space>
  )
}

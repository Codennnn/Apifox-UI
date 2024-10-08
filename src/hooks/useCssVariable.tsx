import { theme } from 'antd'

export function useCssVariable(): React.CSSProperties {
  const { token } = theme.useToken()

  return {
    '--ui-tabs-hover-color': token.colorTextBase,
    '--ui-tabs-hover-bg': token.colorFillContent,
  } as React.CSSProperties
}

import { theme } from 'antd'

import { css, type CSSInterpolation } from '@emotion/css'

type Theme = ReturnType<typeof theme.useToken>

type CSSFunction = (token: Theme) => CSSInterpolation | CSSInterpolation[]

export function useStyle(cssFn: CSSFunction) {
  return css(cssFn(theme.useToken()))
}

type StyleFunction = (token: Theme) => Record<string, string>

export function useStyles(fn: StyleFunction): { styles: ReturnType<StyleFunction> } {
  return { styles: fn(theme.useToken()) }
}

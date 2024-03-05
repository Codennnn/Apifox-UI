import { theme } from 'antd'

import { css, type CSSInterpolation } from '@emotion/css'

type Theme = ReturnType<typeof theme.useToken>

type CSSFunction = (token: Theme) => CSSInterpolation | CSSInterpolation[]

export function useStyle(cssFn: CSSFunction) {
  return css(cssFn(theme.useToken()))
}

type StyleFunction<T> = (token: Theme) => T

export function useStyles<T>(fn: StyleFunction<T>): { styles: ReturnType<StyleFunction<T>> } {
  return { styles: fn(theme.useToken()) }
}

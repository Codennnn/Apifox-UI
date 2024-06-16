import { theme } from 'antd'

import { css } from '@emotion/css'

type Theme = ReturnType<typeof theme.useToken>

type StyleFunction<T> = (theme: Theme, cssFn: typeof css) => T

export function useStyles<T>(fn: StyleFunction<T>): { styles: ReturnType<StyleFunction<T>> } {
  return { styles: fn(theme.useToken(), css) }
}

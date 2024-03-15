import { theme } from 'antd'

type Theme = ReturnType<typeof theme.useToken>

type StyleFunction<T> = (token: Theme) => T

export function useStyles<T>(fn: StyleFunction<T>): { styles: ReturnType<StyleFunction<T>> } {
  return { styles: fn(theme.useToken()) }
}

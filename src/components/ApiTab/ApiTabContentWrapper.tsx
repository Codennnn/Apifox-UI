import { ConfigProvider, theme } from 'antd'

export function ApiTabContentWrapper(props: React.PropsWithChildren<{ className?: string }>) {
  const { token } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: token.colorFillAlter,
          },
        },
      }}
    >
      <div className={`h-full ${props.className || ''}`}>{props.children}</div>
    </ConfigProvider>
  )
}

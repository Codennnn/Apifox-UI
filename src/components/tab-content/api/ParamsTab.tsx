import { Tabs } from 'antd'

/**
 * 请求参数页签。
 */
export function ParamsTab() {
  return (
    <Tabs
      animated={false}
      items={[
        {
          key: 'params',
          label: 'Params',
        },
        {
          key: 'body',
          label: 'Body',
        },
        {
          key: 'cookie',
          label: 'Cookie',
        },
        {
          key: 'header',
          label: 'Header',
        },
        {
          key: 'auth',
          label: 'Auth',
        },
      ]}
    />
  )
}

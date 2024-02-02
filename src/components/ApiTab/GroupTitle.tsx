import { Typography } from 'antd'

export function GroupTitle(props: React.PropsWithChildren) {
  return <Typography.Text type="secondary">{props.children}</Typography.Text>
}

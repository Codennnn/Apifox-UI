import { Typography } from 'antd'

export function GroupTitle(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`${props.className || ''} font-medium`}>
      <Typography.Text>{props.children}</Typography.Text>
    </div>
  )
}

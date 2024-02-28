import { Button, Popconfirm } from 'antd'

import { useGlobalContext } from '@/contexts/global'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'

export function ApiRemoveButton(props: { tabKey: string }) {
  const { tabKey } = props

  const { removeMenuItem } = useGlobalContext()
  const { removeTabItem } = useMenuTabHelpers()

  return (
    <Popconfirm
      placement="bottom"
      title="确定删除该接口？"
      onConfirm={() => {
        removeTabItem({ key: tabKey })
        removeMenuItem({ id: tabKey })
      }}
    >
      <Button>删除</Button>
    </Popconfirm>
  )
}

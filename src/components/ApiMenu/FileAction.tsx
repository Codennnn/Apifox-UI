import { Dropdown } from 'antd'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'

import { useGlobalContext } from '@/contexts/global'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

export function FileAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const { removeMenuItem } = useGlobalContext()

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'delete',
            label: '删除',
            icon: <TrashIcon size={14} />,
            onClick: (ev) => {
              ev.domEvent.stopPropagation()

              removeMenuItem({ id: catalog.id })
            },
          },
        ],
      }}
    >
      <MenuActionButton
        icon={<MoreHorizontalIcon size={14} />}
        onClick={(ev) => {
          ev.stopPropagation()
        }}
      />
    </Dropdown>
  )
}

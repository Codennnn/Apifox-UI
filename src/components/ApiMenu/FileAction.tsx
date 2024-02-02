import { Dropdown } from 'antd'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'

import { MenuItemType } from '../../enums'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

export function FileAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

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

              switch (catalog.type) {
                case MenuItemType.ApiDetail:
                  break

                case MenuItemType.ApiSchema:
                  break

                default:
                  throw new Error()
              }
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

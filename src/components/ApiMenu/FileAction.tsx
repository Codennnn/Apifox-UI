import { Dropdown } from 'antd'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'

import { CatalogType } from '../../enums'

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
              switch (catalog.catalogType) {
                case CatalogType.Http:
                  break

                case CatalogType.Schema:
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

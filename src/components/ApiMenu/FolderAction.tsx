import { Dropdown, Tooltip } from 'antd'
import {
  FolderEditIcon,
  FolderPlusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'

import { apiMenuConfig } from '@/configs/static'
import { getCatalogType } from '@/utils'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

export function FolderAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const catalogType = getCatalogType(catalog.type)
  const { tipTitle } = apiMenuConfig[catalogType]

  return (
    <>
      <Tooltip title={tipTitle}>
        <MenuActionButton
          icon={<PlusIcon size={14} />}
          onClick={(ev) => {
            ev.stopPropagation()
          }}
        />
      </Tooltip>

      <Dropdown
        menu={{
          items: [
            {
              key: 'edit',
              label: '编辑',
              icon: <FolderEditIcon size={14} />,
              onClick: (ev) => {
                ev.domEvent.stopPropagation()
              },
            },
            {
              key: 'new',
              label: '添加子目录',
              icon: <FolderPlusIcon size={14} />,
              onClick: (ev) => {
                ev.domEvent.stopPropagation()
              },
            },
            { type: 'divider' },
            {
              key: 'delete',
              label: '删除',
              icon: <TrashIcon size={14} />,
              onClick: (ev) => {
                ev.domEvent.stopPropagation()
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
    </>
  )
}

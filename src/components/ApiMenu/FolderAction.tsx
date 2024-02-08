import { show } from '@ebay/nice-modal-react'
import { Dropdown, Tooltip } from 'antd'
import {
  FolderEditIcon,
  FolderPlusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'

import { NewCatalogModal } from '@/components/modals/NewCatalogModal'
import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { getCatalogType } from '@/utils'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

export function FolderAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const catalogType = getCatalogType(catalog.type)
  const { tipTitle } = apiMenuConfig[catalogType]

  const { removeMenuItem } = useGlobalContext()

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
                void show(NewCatalogModal, {
                  formData: { parentId: catalog.id, type: catalog.type },
                })
              },
            },
            { type: 'divider' },
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
    </>
  )
}

import { show } from '@ebay/nice-modal-react'
import { Dropdown, Tooltip } from 'antd'
import {
  FolderEditIcon,
  FolderPlusIcon,
  MoreHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'
import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { NewCatalogModal } from '@/components/modals/NewCatalogModal'
import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { MenuItemType } from '@/enums'
import { getCatalogType } from '@/helpers'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

/**
 * 菜单项的文件夹操作。
 */
export function FolderAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const catalogType = getCatalogType(catalog.type)
  const { tipTitle, newLabel } = apiMenuConfig[catalogType]

  const { modal, removeMenuItem } = useGlobalContext()
  const { addTabItem } = useMenuTabHelpers()

  return (
    <>
      <Tooltip title={tipTitle}>
        <MenuActionButton
          icon={<PlusIcon size={14} />}
          onClick={(ev) => {
            ev.stopPropagation()

            const contentType =
              catalog.type === MenuItemType.ApiDetailFolder ||
              catalog.type === MenuItemType.RequestFolder
                ? MenuItemType.ApiDetail
                : catalog.type === MenuItemType.ApiSchemaFolder
                  ? MenuItemType.ApiSchema
                  : 'blank'

            addTabItem({
              key: nanoid(4),
              label: newLabel,
              contentType,
              data: { tabStatus: PageTabStatus.Create },
            })
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

                modal.confirm({
                  title: <span className="font-normal">删除目录“{catalog.name}”？</span>,
                  content: `${
                    catalog.type === MenuItemType.ApiDetailFolder
                      ? '该目录及该目录下的接口和用例都'
                      : catalog.type === MenuItemType.ApiSchemaFolder
                        ? '该目录及该目录下的数据模型都'
                        : ''
                  }将移至回收站，30 天后自动彻底删除。`,
                  okText: '删除',
                  okButtonProps: { danger: true },
                  maskClosable: true,
                  onOk: () => {
                    removeMenuItem({ id: catalog.id })
                  },
                })
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

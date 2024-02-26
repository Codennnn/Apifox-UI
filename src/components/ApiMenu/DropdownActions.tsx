import { show } from '@ebay/nice-modal-react'
import { Dropdown, type DropDownProps, theme } from 'antd'
import { FolderEditIcon, FolderPlusIcon, TrashIcon } from 'lucide-react'

import type { ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import { FileIcon } from '@/components/icons/FileIcon'
import { NewCatalogModal } from '@/components/modals/NewCatalogModal'
import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { MenuItemType } from '@/enums'
import { getCatalogType, getCreateType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'

interface DropdownActionsProps extends DropDownProps {
  catalog: ApiMenuData
  isFolder?: boolean
}

/**
 * 菜单的操作菜单。
 */
export function DropdownActions(props: React.PropsWithChildren<DropdownActionsProps>) {
  const { token } = theme.useToken()

  const { children, catalog, isFolder = false, ...dropdownProps } = props

  const { modal, removeMenuItem } = useGlobalContext()
  const { createTabItem } = useHelpers()

  const { tipTitle } = apiMenuConfig[getCatalogType(catalog.type)]
  const createType = getCreateType(catalog.type)

  return (
    <Dropdown
      menu={{
        items: isFolder
          ? [
              {
                key: 'create',
                label: tipTitle,
                icon: (
                  <FileIcon size={14} style={{ color: token.colorPrimary }} type={createType} />
                ),
                onClick: (ev) => {
                  ev.domEvent.stopPropagation()
                  createTabItem(createType)
                },
              },
              { type: 'divider' },
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
            ]
          : [
              {
                key: 'delete',
                label: '删除',
                icon: <TrashIcon size={14} />,
                onClick: (ev) => {
                  ev.domEvent.stopPropagation()

                  const { title } = apiMenuConfig[getCatalogType(catalog.type)]

                  modal.confirm({
                    title: (
                      <span className="font-normal">
                        删除{title}“{catalog.name}”？
                      </span>
                    ),
                    content: `${
                      catalog.type === MenuItemType.ApiDetail
                        ? '该接口和该接口下的用例都'
                        : catalog.type === MenuItemType.Doc
                          ? '文档'
                          : catalog.type === MenuItemType.ApiSchema
                            ? '该数据模型'
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
      {...dropdownProps}
    >
      {children}
    </Dropdown>
  )
}

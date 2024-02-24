import { Dropdown } from 'antd'
import { MoreHorizontalIcon, TrashIcon } from 'lucide-react'

import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { MenuItemType } from '@/enums'
import { getCatalogType } from '@/helpers'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

/**
 * 菜单项的文件操作。
 */
export function FileAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const { modal, removeMenuItem } = useGlobalContext()

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

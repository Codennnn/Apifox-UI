import { useMemo } from 'react'

import { CaretRightFilled } from '@ant-design/icons'
import { show } from '@ebay/nice-modal-react'
import { Dropdown, type DropdownProps, theme, Tooltip } from 'antd'
import {
  CheckIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  FolderPlusIcon,
  MoreHorizontalIcon,
  PlusIcon,
} from 'lucide-react'

import { AppMenuControls } from '@/components/ApiMenu/AppMenuControls'
import { FolderIcon } from '@/components/icons/FolderIcon'
import { NewCatalogModal } from '@/components/modals/NewCatalogModal'
import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { CatalogType, MenuItemType } from '@/enums'
import { isMenuFolder } from '@/utils'

import { useApiMenuContext } from './ApiMenuContext'
import { MenuActionButton } from './MenuActionButton'

type DropdownMenuItems = NonNullable<DropdownProps['menu']>['items']

interface ApiMenuTopTitleProps {
  topMenuType: CatalogType
  extraDropdownMenuItems?: DropdownMenuItems
}

/**
 * 菜单目录的顶级标题，用于归类不同类型的目录，如项目概览、接口、数据模型、快捷请求、回收站等。
 */
export function ApiMenuTitleTop(props: ApiMenuTopTitleProps) {
  const { token } = theme.useToken()

  const { topMenuType, extraDropdownMenuItems = [] } = props

  const { apiDetailDisplay, setApiDetailDisplay } = useGlobalContext()

  const {
    groupedMenus,
    expandedMenuKeys,

    addExpandedMenuKeys,
    removeExpandedMenuKeys,
  } = useApiMenuContext()

  const menuFolderKeys = useMemo(() => {
    const folders = groupedMenus?.[topMenuType].filter((it) =>
      isMenuFolder(it.customData.catalog.type)
    )
    const menuKeys = folders?.map((it) => it.key) || []

    return [topMenuType, ...menuKeys]
  }, [groupedMenus, topMenuType])

  const allExpanded = useMemo<boolean>(() => {
    return menuFolderKeys.every((key) => expandedMenuKeys.includes(key))
  }, [menuFolderKeys, expandedMenuKeys])

  const menuConfig = apiMenuConfig[topMenuType]

  const noActions = topMenuType === CatalogType.Overview || topMenuType === CatalogType.Recycle

  return (
    <span className="flex h-7 items-center">
      <span className="inline-flex items-center">
        <span>{menuConfig.title}</span>

        {!noActions && (
          <span
            className={`ml-1 scale-50 ${expandedMenuKeys.includes(topMenuType) ? 'rotate-90' : ''}`}
          >
            <CaretRightFilled />
          </span>
        )}
      </span>

      {!noActions && (
        <AppMenuControls>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'newSubCatalog',
                  label: menuConfig.newLabel,
                  icon: <FolderIcon size={14} type={topMenuType} />,
                  onClick: (ev) => {
                    ev.domEvent.stopPropagation()
                  },
                },
                {
                  key: 'newCatalog',
                  label: '新建目录',
                  icon: <FolderPlusIcon size={14} />,
                  onClick: (ev) => {
                    ev.domEvent.stopPropagation()
                    void show(NewCatalogModal, {
                      formData: {
                        parentId: undefined,
                        type:
                          topMenuType === CatalogType.Http
                            ? MenuItemType.ApiDetailFolder
                            : topMenuType === CatalogType.Schema
                              ? MenuItemType.ApiSchemaFolder
                              : MenuItemType.RequestFolder,
                      },
                    })
                  },
                },
                ...extraDropdownMenuItems,
              ],
            }}
          >
            <MenuActionButton
              icon={<PlusIcon size={14} />}
              onClick={(ev) => {
                ev.stopPropagation()
              }}
            />
          </Dropdown>

          <Tooltip title={allExpanded ? '全部收起' : '全部展开'}>
            <MenuActionButton
              icon={
                allExpanded ? <ChevronsDownUpIcon size={14} /> : <ChevronsUpDownIcon size={14} />
              }
              onClick={(ev) => {
                ev.stopPropagation()

                const keys = [topMenuType, ...menuFolderKeys]

                if (allExpanded) {
                  removeExpandedMenuKeys(keys)
                } else {
                  addExpandedMenuKeys(keys)
                }
              }}
            />
          </Tooltip>

          {topMenuType === CatalogType.Http && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'displayName',
                    label: '接口显示为名称',
                    icon: (
                      <CheckIcon
                        size={14}
                        style={{
                          color: token.colorPrimary,
                          opacity: apiDetailDisplay === 'name' ? undefined : 0,
                        }}
                      />
                    ),
                    onClick: (ev) => {
                      ev.domEvent.stopPropagation()
                      setApiDetailDisplay('name')
                    },
                  },
                  {
                    key: 'displayPath',
                    label: '接口显示为 URL',
                    icon: (
                      <CheckIcon
                        size={14}
                        style={{
                          color: token.colorPrimary,
                          opacity: apiDetailDisplay === 'path' ? undefined : 0,
                        }}
                      />
                    ),
                    onClick: (ev) => {
                      ev.domEvent.stopPropagation()
                      setApiDetailDisplay('path')
                    },
                  },
                ],
              }}
            >
              <MenuActionButton
                icon={
                  <MoreHorizontalIcon
                    size={14}
                    onClick={(ev) => {
                      ev.stopPropagation()
                    }}
                  />
                }
              />
            </Dropdown>
          )}
        </AppMenuControls>
      )}
    </span>
  )
}

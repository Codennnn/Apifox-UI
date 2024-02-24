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
import { nanoid } from 'nanoid'

import { AppMenuControls } from '@/components/ApiMenu/AppMenuControls'
import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { FolderIcon } from '@/components/icons/FolderIcon'
import { NewCatalogModal } from '@/components/modals/NewCatalogModal'
import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { CatalogType, MenuItemType } from '@/enums'
import { isMenuFolder } from '@/helpers'
import { ROOT_CATALOG } from '@/hooks/useCatalog'

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

  const { addTabItem } = useMenuTabHelpers()

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

  const { title, newLabel } = apiMenuConfig[topMenuType]

  const noActions = topMenuType === CatalogType.Overview || topMenuType === CatalogType.Recycle

  return (
    <span className="flex h-7 items-center">
      <span className="inline-flex items-center">
        <span>{title}</span>

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
                  label: newLabel,
                  icon: <FolderIcon size={14} type={topMenuType} />,
                  onClick: (ev) => {
                    ev.domEvent.stopPropagation()

                    const contentType =
                      topMenuType === CatalogType.Http || topMenuType === CatalogType.Request
                        ? MenuItemType.ApiDetail
                        : topMenuType === CatalogType.Schema
                          ? MenuItemType.ApiSchema
                          : 'blank'

                    addTabItem({
                      key: nanoid(4),
                      label: newLabel,
                      contentType,
                      data: { tabStatus: PageTabStatus.Create },
                    })
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
                        parentId: ROOT_CATALOG,
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

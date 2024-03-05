import { useMemo, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { ConfigProvider, Dropdown, Popconfirm, Tabs, type TabsProps } from 'antd'
import { BadgeInfoIcon, XIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import type { CatalogId } from '@/components/ApiMenu'
import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { FolderIcon } from '@/components/icons/FolderIcon'
import { HttpMethodText } from '@/components/icons/HttpMethodText'
import { apiMenuConfig } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { initialCreateApiDetailsData } from '@/data/remote'
import { getCatalogType, getCreateType, hasAccentColor, isCreateType } from '@/helpers'
import { useStyles } from '@/hooks/useStyle'

import { useMenuTabContext, useMenuTabHelpers } from '../../contexts/menu-tab-settings'
import { MenuItemType } from '../../enums'

import type { Tab } from './ApiTab.type'
import { ApiTabAction, useApiTabActions } from './ApiTabAction'
import { ApiTabContent } from './ApiTabContent'
import { TabContentProvider } from './TabContentContext'

import { css } from '@emotion/css'

/**
 * 菜单内容页签。
 *
 * 主要逻辑：
 *
 * - 当插入新的页签时，插入的位置应该是当前被激活的页签的后一位。
 * - 当激活中的页签被移除后，应该激活上一次被激活的页签（如果此页签也被移除了，则应该继续往前找）。
 * - 当前激活的是“新建”页时，点击任意菜单会覆盖此“新建”页，而不是新增一个页签。
 */
export function ApiTab(props: TabsProps) {
  const [confirmKey, setConfirmKey] = useState<CatalogId>()

  const { menuRawList } = useGlobalContext()
  const { tabItems, activeTabKey } = useMenuTabContext()
  const { activeTabItem, addTabItem, getTabItem, removeTabItem } = useMenuTabHelpers()
  const { menuItems } = useApiTabActions()

  const handleItemRemove = useEvent((key: CatalogId, forceClose?: boolean) => {
    const item = getTabItem({ key })

    if (forceClose !== true && item?.data?.editStatus === 'changed') {
      setConfirmKey(key)
    } else {
      setConfirmKey(undefined)
      removeTabItem({ key })
    }
  })

  const items: Tab[] = useMemo(() => {
    return tabItems.map((tabItem) => {
      const menuData = menuRawList?.find((it) => it.id === tabItem.key)

      const label = (
        <span className="app-tabs-tab-label flex items-center gap-1">
          {menuData?.type === MenuItemType.ApiDetail ||
          menuData?.type === MenuItemType.HttpRequest ? (
            <span className="mr-1 font-medium">
              <HttpMethodText method={menuData.data?.method} />
            </span>
          ) : tabItem.contentType === MenuItemType.ApiDetail &&
            tabItem.data?.tabStatus === PageTabStatus.Create ? (
            <span className="mr-1 font-medium">
              <HttpMethodText method={initialCreateApiDetailsData.method} />
            </span>
          ) : (
            <FolderIcon
              size={16}
              style={{
                color:
                  isCreateType(tabItem.contentType) && hasAccentColor(tabItem.contentType)
                    ? apiMenuConfig[getCatalogType(getCreateType(tabItem.contentType))].accentColor
                    : void 0,
              }}
              type={tabItem.contentType}
            />
          )}
          <span>{menuData?.name || tabItem.label}</span>
        </span>
      )

      return {
        key: tabItem.key,
        label,
        className: 'group',
        closeIcon: (
          <Popconfirm
            icon={<BadgeInfoIcon />}
            okText="确认关闭"
            okType="danger"
            open={tabItem.data?.editStatus === 'changed' && confirmKey === tabItem.key}
            title="有修改的内容未保存！"
            onCancel={(ev) => {
              ev?.stopPropagation()
              setConfirmKey(undefined)
            }}
            onConfirm={(ev) => {
              ev?.stopPropagation()
              handleItemRemove(tabItem.key, true)
            }}
          >
            <span
              className={`main-tabs-tab-close-icon flex size-full items-center justify-center text-[15px] opacity-0 ${
                tabItem.data?.editStatus === 'changed'
                  ? 'changed after:bg-primary-500 group relative overflow-hidden rounded-full after:absolute after:size-2 after:rounded-full after:content-[""] hover:overflow-auto hover:bg-transparent hover:after:hidden'
                  : ''
              }`}
            >
              <XIcon
                className={
                  tabItem.data?.editStatus === 'changed' ? '!invisible group-hover:!visible' : ''
                }
                size={18}
              />
            </span>
          </Popconfirm>
        ),
        children: (
          <TabContentProvider tabData={tabItem}>
            <ApiTabContent />
          </TabContentProvider>
        ),
      }
    })
  }, [tabItems, menuRawList, confirmKey, handleItemRemove])

  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <div className="app-tabs-wrap flex select-none items-center">
      <DefaultTabBar {...tabBarProps}>
        {(node) => (
          <Dropdown menu={{ items: menuItems }} trigger={['contextMenu']}>
            {node}
          </Dropdown>
        )}
      </DefaultTabBar>
    </div>
  )

  const { styles } = useStyles(({ token }) => {
    return {
      appTabs: css({
        '&.ant-tabs': {
          '.app-tabs-wrap': {
            '.ant-tabs-tab:hover': {
              '.main-tabs-tab-close-icon': {
                opacity: 1,
              },
            },

            '.ant-tabs-nav': {
              backgroundColor: token.colorFillAlter,

              '.ant-tabs-tab:not(.ant-tabs-tab-active) .app-tabs-tab-label': {
                color: token.colorTextSecondary,
              },
            },
          },

          '.ant-tabs-nav': {
            '.ant-tabs-nav-add': {
              borderRadius: token.borderRadiusSM,
            },
          },
        },
      }),
    }
  })

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            cardBg: 'transparent',
            horizontalMargin: '0',
          },
        },
      }}
    >
      <Tabs
        hideAdd
        activeKey={activeTabKey}
        className={`app-tabs ${styles.appTabs}`}
        items={items}
        renderTabBar={renderTabBar}
        tabBarExtraContent={<ApiTabAction />}
        tabBarStyle={{ width: '100%', marginBottom: 0 }}
        type="editable-card"
        onEdit={(key, action) => {
          if (action === 'add') {
            addTabItem({
              key: nanoid(),
              label: '新建...',
              contentType: 'blank',
            })
          } else if (
            /* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */
            action === 'remove'
          ) {
            if (typeof key === 'string') {
              handleItemRemove(key)
            }
          }
        }}
        onTabClick={(key) => {
          activeTabItem({ key })
        }}
        {...props}
      />
    </ConfigProvider>
  )
}

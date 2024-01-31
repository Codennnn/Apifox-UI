import { useMemo, useState } from 'react'
import useEvent from 'react-use-event-hook'

import { ConfigProvider, Popconfirm, Tabs, type TabsProps } from 'antd'
import { BadgeInfoIcon, XIcon } from 'lucide-react'

import type { CatalogId } from '@/components/ApiMenu'
import { HttpMethodText } from '@/components/icons/HttpMethodText'
import { useGlobalContext } from '@/contexts/global'

import { useMenuTabContext, useMenuTabHelpers } from '../../contexts/menu-tab-settings'
import { CatalogType } from '../../enums'
import { FileIcon } from '../icons/FileIcon'

import type { Tab } from './ApiTab.type'
import { ApiTabAction } from './ApiTabAction'
import { ApiTabContent } from './ApiTabContent'
import { TabContentProvider } from './TabContentContext'

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
  const { activeTabItem, getTabItem, removeTabItem } = useMenuTabHelpers()

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
        <span className="flex items-center gap-1">
          {menuData?.catalogType === CatalogType.Http ? (
            <span className="mr-1 font-medium">
              <HttpMethodText method={menuData.data?.method} />
            </span>
          ) : (
            <FileIcon size={16} type={tabItem.contentType} />
          )}
          <span>{tabItem.label}</span>
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
              className={`main-tabs-tab-close-icon flex size-full items-center justify-center text-[15px] ${
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

  const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
    <div className="flex select-none items-center">
      <DefaultTabBar {...props} />
    </div>
  )

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            colorPrimary: 'currentColor',
            colorPrimaryHover: 'currentColor',
            colorPrimaryActive: 'currentColor',
            colorFillAlter: 'transparent',
            horizontalMargin: '0',
          },
        },
      }}
    >
      <Tabs
        hideAdd
        activeKey={activeTabKey}
        className="app-tabs"
        items={items}
        renderTabBar={renderTabBar}
        tabBarExtraContent={<ApiTabAction />}
        tabBarStyle={{ width: '100%', marginBottom: 0 }}
        type="editable-card"
        onEdit={(key, action) => {
          if (typeof key === 'string') {
            if (action === 'remove') {
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

import { cloneElement, type PointerEvent, useMemo, useState } from 'react'
import useEvent from 'react-use-event-hook'

import {
  DndContext,
  type DndContextProps,
  PointerSensor as LibPointerSensor,
  useSensor,
} from '@dnd-kit/core'
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ConfigProvider, Dropdown, Popconfirm, Tabs, type TabsProps, theme } from 'antd'
import { BadgeInfoIcon, XIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import type { CatalogId } from '@/components/ApiMenu'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useStyles } from '@/hooks/useStyle'

import { useMenuTabContext, useMenuTabHelpers } from '../../contexts/menu-tab-settings'

import type { Tab } from './ApiTab.type'
import { ApiTabAction, useApiTabActions } from './ApiTabAction'
import { ApiTabContent } from './ApiTabContent'
import { ApiTabLabel } from './ApiTabLabel'
import { TabContentProvider } from './TabContentContext'

import { css } from '@emotion/css'

// 如果元素有 "data-no-dnd" 属性，则阻止 DnD 事件传播。
const handler = ({ nativeEvent: event }: PointerEvent) => {
  let cur = event.target as HTMLElement

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (cur) {
    if (cur.dataset.noDnd) {
      return false
    }
    cur = cur.parentElement!
  }

  return true
}

class PointerSensor extends LibPointerSensor {
  static activators = [
    { eventName: 'onPointerDown', handler },
  ] as (typeof LibPointerSensor)['activators']
}

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { token } = theme.useToken()

  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 99 : undefined,
    outline: isDragging ? `1px solid ${token.colorPrimaryBorder}` : undefined,
  }

  return cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

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

  const { menuRawList } = useMenuHelpersContext()
  const { tabItems, setTabItems, activeTabKey } = useMenuTabContext()
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

      return {
        key: tabItem.key,
        label: <ApiTabLabel menuData={menuData} tabItem={tabItem} />,
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
              className={`main-tabs-tab-close-icon flex size-full items-center justify-center text-[15px] opacity-0 ${tabItem.data?.editStatus === 'changed'
                  ? 'changed after:bg-primary-500 group relative overflow-hidden rounded-full after:absolute after:size-2 after:rounded-full after:content-[""] hover:overflow-auto hover:bg-transparent hover:after:hidden'
                  : ''
                }`}
              data-no-dnd="true" // 「关闭」按钮不允许触发拖拽。
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

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const handleDragEnd: DndContextProps['onDragEnd'] = ({ active, over }) => {
    if (active.id !== over?.id) {
      setTabItems((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DndContext sensors={[sensor]} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
        <DefaultTabBar {...tabBarProps} className="ui-tabs-nav">
          {(node) => (
            <DraggableTabNode {...node.props} key={node.key}>
              <div>
                <Dropdown menu={{ items: menuItems }} trigger={['contextMenu']}>
                  {node}
                </Dropdown>
              </div>
            </DraggableTabNode>
          )}
        </DefaultTabBar>
      </SortableContext>
    </DndContext>
  )

  const { styles } = useStyles(({ token }) => {
    return {
      appTabs: css({
        '&.ant-tabs': {
          '.ui-tabs-nav': {
            '&.ant-tabs-nav': {
              '.ant-tabs-tab:not(.ant-tabs-tab-active) ': {
                '.ui-tabs-tab-label': {
                  color: token.colorTextSecondary,
                },

                '&::before': {
                  backgroundColor: token.colorBorderSecondary,
                },
              },
            },
          },
        },
      }),
    }
  })

  const handleEdit: TabsProps['onEdit'] = (key, action) => {
    if (action === 'add') {
      addTabItem({
        key: nanoid(6),
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
  }

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
        className={`ui-tabs main-tabs ${styles.appTabs}`}
        items={items}
        renderTabBar={renderTabBar}
        tabBarExtraContent={<ApiTabAction />}
        tabBarStyle={{ width: '100%', marginBottom: 0 }}
        type="editable-card"
        onEdit={handleEdit}
        onTabClick={(key) => {
          activeTabItem({ key })
        }}
        {...props}
      />
    </ConfigProvider>
  )
}

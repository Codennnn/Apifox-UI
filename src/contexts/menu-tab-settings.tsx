import { createContext, useContext, useEffect, useState } from 'react'
import useEvent from 'react-use-event-hook'

import type { ApiTabItem, EditStatus } from '@/components/ApiTab'
import { initialActiveTabKey, initialTabItems } from '@/data/remote'

interface MenuTabContextData {
  /** 当前在 Tabs 中打开的所有页签。 */
  tabItems: ApiTabItem[]
  setTabItems: React.Dispatch<React.SetStateAction<ApiTabItem[]>>

  /** 当前激活的页签。 */
  activeTabKey: ApiTabItem['key'] | undefined
  setActiveTabKey: React.Dispatch<React.SetStateAction<ApiTabItem['key'] | undefined>>

  /** 上一次被激活的页签。 */
  lastActiveTabKey: ApiTabItem['key'] | undefined
  setLastActiveTabKey: React.Dispatch<React.SetStateAction<ApiTabItem['key'] | undefined>>
}

const MenuTabContext = createContext({} as MenuTabContextData)

export function MenuTabProvider(props: React.PropsWithChildren) {
  const [tabItems, setTabItems] = useState<ApiTabItem[]>([])
  const [activeTabKey, setActiveTabKey] = useState<ApiTabItem['key']>()
  const [lastActiveTabKey, setLastActiveTabKey] = useState<ApiTabItem['key']>()

  useEffect(() => {
    setTabItems(initialTabItems)
    setActiveTabKey(initialActiveTabKey)
  }, [])

  return (
    <MenuTabContext.Provider
      value={{
        tabItems,
        setTabItems,

        activeTabKey,
        setActiveTabKey,

        lastActiveTabKey,
        setLastActiveTabKey,
      }}
    >
      {props.children}
    </MenuTabContext.Provider>
  )
}

export const useMenuTabContext = () => useContext(MenuTabContext)

interface MenuTabHelpers {
  /** 激活指定的页签。 */
  activeTabItem: (payload: Pick<ApiTabItem, 'key'>) => void
  /** 获取指定的页签项。 */
  getTabItem: (payload: Pick<ApiTabItem, 'key'>) => ApiTabItem | undefined
  /** 添加新的页签。 */
  addTabItem: (
    payload: ApiTabItem,
    config?: { autoActive?: boolean; replaceTab?: ApiTabItem['key'] }
  ) => void
  /** 移除页签。 */
  removeTabItem: (payload: Pick<ApiTabItem, 'key'>) => void
  /** 移除所有页签。 */
  removeAllTabItems: () => void
  /** 移除所有页签，除了当前激活的页签。 */
  removeOtherTabItems: () => void
  setTabItemEditStatus: (payload: Pick<ApiTabItem, 'key'>, editStatus: EditStatus) => void
}

export function useMenuTabHelpers(): MenuTabHelpers {
  const {
    tabItems,
    setTabItems,
    activeTabKey,
    setActiveTabKey,
    lastActiveTabKey,
    setLastActiveTabKey,
  } = useMenuTabContext()

  const activeTabItem = useEvent<MenuTabHelpers['activeTabItem']>((payload) => {
    setLastActiveTabKey(() => activeTabKey)

    if (tabItems.length > 0) {
      setActiveTabKey(() => payload.key)
    }
  })

  const getTabItem = useEvent<MenuTabHelpers['getTabItem']>((payload) => {
    return tabItems.find((item) => item.key === payload.key)
  })

  const addTabItem = useEvent<MenuTabHelpers['addTabItem']>(
    (payload, { autoActive = true, replaceTab } = {}) => {
      const isSameTabPresent = tabItems.some((item) => item.key === payload.key)

      if (isSameTabPresent) {
        throw new Error('已存在相同的页签。')
      } else {
        if (replaceTab) {
          setTabItems((items) => items.map((it) => (it.key === replaceTab ? payload : it)))
        } else {
          setTabItems((items) => [...items, payload])
        }

        if (autoActive) {
          activeTabItem({ key: payload.key })
        }
      }
    }
  )

  const removeTabItem = useEvent<MenuTabHelpers['removeTabItem']>((payload) => {
    setTabItems((items) => {
      const newItems = items.filter((item) => item.key !== payload.key)

      if (activeTabKey === payload.key) {
        setActiveTabKey(() => undefined)

        const valideTabKey =
          lastActiveTabKey && newItems.findIndex((item) => item.key === lastActiveTabKey) !== -1

        if (valideTabKey) {
          activeTabItem({ key: lastActiveTabKey })
        } else {
          setLastActiveTabKey(() => undefined)

          const lastTabKey = newItems.at(-1)?.key

          if (lastTabKey) {
            activeTabItem({ key: lastTabKey })
          }
        }
      }

      return newItems
    })
  })

  const removeAllPageTabItems = useEvent<MenuTabHelpers['removeAllTabItems']>(() => {
    setActiveTabKey(() => undefined)
    setTabItems(() => [])
  })

  const removeOtherTabItems = useEvent<MenuTabHelpers['removeOtherTabItems']>(() => {
    if (activeTabKey) {
      setTabItems((items) => items.filter((item) => item.key === activeTabKey))
    }
  })

  const setTabItemEditStatus = useEvent<MenuTabHelpers['setTabItemEditStatus']>(
    (payload, editStatus) => {
      setTabItems((items) => {
        return items.map((item) => {
          if (item.key === payload.key) {
            return { ...item, data: { ...item.data, editStatus } }
          }
          return item
        })
      })
    }
  )

  return {
    activeTabItem,
    getTabItem,
    addTabItem,
    removeTabItem,
    removeAllTabItems: removeAllPageTabItems,
    removeOtherTabItems,
    setTabItemEditStatus,
  }
}

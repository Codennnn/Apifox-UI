import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { Modal } from 'antd'
import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu'
import { apiDirectoryData, creator, recycleList } from '@/data/remote'
import type { RecycleData } from '@/types'

type ModalHookApi = ReturnType<typeof Modal.useModal>[0]

interface MenuHelpers {
  /** 添加一个新的菜单项到菜单列表中。 */
  addMenuItem: (menuData: ApiMenuData) => void
  /** 从菜单列表中移除一个菜单项。 */
  removeMenuItem: (menuData: Pick<ApiMenuData, 'id'>) => void
  /** 更新一个菜单项的信息。 */
  updateMenuItem: (menuData: Partial<ApiMenuData> & Pick<ApiMenuData, 'id'>) => void
  /** 从回收站中恢复菜单项。 */
  restoreMenuItem: (menuData: Partial<ApiMenuData> & Pick<ApiMenuData, 'id'>) => void
}

interface GlobalContextData extends MenuHelpers {
  menuRawList?: ApiMenuData[]
  recyleRawList?: RecycleData[]
  modal: ModalHookApi

  menuSearchWord?: string
  setMenuSearchWord?: React.Dispatch<React.SetStateAction<GlobalContextData['menuSearchWord']>>

  apiDetailDisplay: 'name' | 'path'
  setApiDetailDisplay: React.Dispatch<React.SetStateAction<GlobalContextData['apiDetailDisplay']>>
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren<{ modal: ModalHookApi }>) {
  const { children, modal } = props

  const [menuRawList, setMenuRawList] = useState<ApiMenuData[]>()
  const [recyleRawList, setRecyleRawList] = useState<RecycleData[]>()

  useEffect(() => {
    setMenuRawList(apiDirectoryData)
    setRecyleRawList(recycleList)
  }, [])

  const [menuSearchWord, setMenuSearchWord] = useState<string>()
  const [apiDetailDisplay, setApiDetailDisplay] =
    useState<GlobalContextData['apiDetailDisplay']>('name')

  const menuHelpers = useMemo<MenuHelpers>(() => {
    return {
      addMenuItem: (menuData) => {
        setMenuRawList((list = []) => [...list, menuData])
      },

      removeMenuItem: ({ id }) => {
        setMenuRawList((list) =>
          list?.filter((item) => {
            const shouldRemove = item.id === id || item.parentId === id

            if (shouldRemove) {
              setRecyleRawList((rlist = []) => {
                const exists = rlist.findIndex((it) => it.deletedItem.id === id) !== -1

                if (exists) {
                  return rlist
                }

                return [...rlist, { id: nanoid(), expiredAt: '30天', creator, deletedItem: item }]
              })
            }

            return !shouldRemove
          })
        )
      },

      updateMenuItem: ({ id, ...rest }) => {
        setMenuRawList((list) =>
          list?.map((item) => {
            if (item.id === id) {
              return { ...item, ...rest } as ApiMenuData
            }

            return item
          })
        )
      },

      restoreMenuItem: ({ id }) => {
        setRecyleRawList((list) => {
          return list?.filter((item) => {
            const shouldRestore = item.deletedItem.id === id

            if (shouldRestore) {
              setMenuRawList((mlist = []) => {
                const exists = mlist.findIndex((it) => it.id === id) !== -1

                if (exists) {
                  return mlist
                }

                return [...mlist, item.deletedItem]
              })
            }

            return !shouldRestore
          })
        })
      },
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        menuRawList,
        recyleRawList,

        menuSearchWord,
        setMenuSearchWord,
        apiDetailDisplay,
        setApiDetailDisplay,

        modal,
        ...menuHelpers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

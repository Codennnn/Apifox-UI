import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu'
import { apiDirectoryData, creator, recycleList } from '@/data/remote'
import type { RecycleData } from '@/types'

interface MenuHelpers {
  addMenuItem: (menuData: ApiMenuData) => void
  removeMenuItem: (menuData: Pick<ApiMenuData, 'id'>) => void
  updateMenuItem: (menuData: Partial<ApiMenuData> & Pick<ApiMenuData, 'id'>) => void
}

interface GlobalContextData extends MenuHelpers {
  menuRawList?: ApiMenuData[]
  recyleRawList?: RecycleData[]

  apiDetailDisplay: 'name' | 'path'
  setApiDetailDisplay: React.Dispatch<React.SetStateAction<GlobalContextData['apiDetailDisplay']>>
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const [menuRawList, setMenuRawList] = useState<ApiMenuData[]>()
  const [recyleRawList, setRecyleRawList] = useState<RecycleData[]>()

  useEffect(() => {
    setMenuRawList(apiDirectoryData)
    setRecyleRawList(recycleList)
  }, [])

  const [apiDetailDisplay, setApiDetailDisplay] =
    useState<GlobalContextData['apiDetailDisplay']>('name')

  const menuHelpers = useMemo<MenuHelpers>(() => {
    return {
      addMenuItem: (menuData) => {
        setMenuRawList((list) => (list ? [...list, menuData] : [menuData]))
      },

      removeMenuItem: ({ id }) => {
        setMenuRawList((list) =>
          list?.filter((item) => {
            const shouldRemove = item.id === id || item.parentId === id

            if (shouldRemove) {
              setRecyleRawList((list) => [
                ...(list || []),
                { id: nanoid(4), expiredAt: '30天', creator, deletedItem: item },
              ])
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
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        menuRawList,
        recyleRawList,
        apiDetailDisplay,
        setApiDetailDisplay,
        ...menuHelpers,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

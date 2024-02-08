import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { ApiMenuData } from '@/components/ApiMenu'
import { apiDirectoryData } from '@/data/remote'

interface MenuHelpers {
  addMenuItem: (menuData: ApiMenuData) => void
  removeMenuItem: (menuData: Pick<ApiMenuData, 'id'>) => void
}

interface GlobalContextData extends MenuHelpers {
  menuRawList?: ApiMenuData[]

  apiDetailDisplay: 'name' | 'path'
  setApiDetailDisplay: React.Dispatch<React.SetStateAction<GlobalContextData['apiDetailDisplay']>>
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const [menuRawList, setMenuRawList] = useState<ApiMenuData[]>()

  useEffect(() => {
    setMenuRawList(apiDirectoryData)
  }, [])

  const [apiDetailDisplay, setApiDetailDisplay] =
    useState<GlobalContextData['apiDetailDisplay']>('name')

  const helpers = useMemo<MenuHelpers>(() => {
    return {
      addMenuItem: (menuData) => {
        setMenuRawList((list) => (list ? [...list, menuData] : [menuData]))
      },

      removeMenuItem: ({ id }) => {
        setMenuRawList((list) => list?.filter((item) => item.id !== id))
      },
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        menuRawList,
        ...helpers,
        apiDetailDisplay,
        setApiDetailDisplay,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

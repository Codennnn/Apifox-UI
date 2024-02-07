import { createContext, useContext, useEffect, useState } from 'react'

import type { ApiMenuData } from '@/components/ApiMenu'
import { apiDirectoryData } from '@/data/remote'

interface GlobalContextData {
  menuRawList?: ApiMenuData[]

  apiDetailDisplay: 'name' | 'path'
  setApiDetailDisplay: React.Dispatch<React.SetStateAction<GlobalContextData['apiDetailDisplay']>>
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const [menuRawList, setMenuRawList] = useState<ApiMenuData[]>()

  const [apiDetailDisplay, setApiDetailDisplay] =
    useState<GlobalContextData['apiDetailDisplay']>('name')

  useEffect(() => {
    setMenuRawList(apiDirectoryData)
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        menuRawList,
        apiDetailDisplay,
        setApiDetailDisplay,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

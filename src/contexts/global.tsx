import { createContext, useContext, useEffect, useState } from 'react'

import type { ApiMenuData } from '@/components/ApiMenu'
import { apiDirectoryData } from '@/data/remote'

interface GlobalContextData {
  menuRawList?: ApiMenuData[]
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const [menuRawList, setMenuRawList] = useState<ApiMenuData[]>()

  useEffect(() => {
    setMenuRawList(apiDirectoryData)
  }, [])

  return <GlobalContext.Provider value={{ menuRawList }}>{props.children}</GlobalContext.Provider>
}

export const useGlobalContext = () => useContext(GlobalContext)

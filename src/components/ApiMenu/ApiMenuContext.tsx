import { createContext, useContext, useMemo, useState } from 'react'

import { CatalogType, MenuId } from '@/enums'

import { type MenuState, useMenuData } from './api-menu-data'

interface ExpandedMenuKeysHelper {
  addExpandedMenuKeys: (keys: string[]) => void
  removeExpandedMenuKeys: (keys: string[]) => void
}

const useExpandedMenuKeysHelper = (
  setExpandedMenuKeys: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return useMemo<ExpandedMenuKeysHelper>(() => {
    return {
      addExpandedMenuKeys: (keys) => {
        setExpandedMenuKeys((k) => Array.from(new Set([...k, ...keys])))
      },
      removeExpandedMenuKeys: (keys) => {
        setExpandedMenuKeys((k) => k.filter((key) => !keys.includes(key)))
      },
    }
  }, [setExpandedMenuKeys])
}

interface ApiMenuContextData extends ExpandedMenuKeysHelper, MenuState {
  expandedMenuKeys: string[]
}

const ApiMenuContext = createContext({} as ApiMenuContextData)

export function ApiMenuContextProvider(props: React.PropsWithChildren) {
  const { children } = props

  const [expandedMenuKeys, setExpandedMenuKeys] = useState<string[]>([
    CatalogType.Http,
    CatalogType.Schema,
    MenuId.宠物店,
  ])

  const helpers = useExpandedMenuKeysHelper(setExpandedMenuKeys)

  const menuState = useMenuData()

  return (
    <ApiMenuContext.Provider value={{ expandedMenuKeys, ...helpers, ...menuState }}>
      {children}
    </ApiMenuContext.Provider>
  )
}

export const useApiMenuContext = () => useContext(ApiMenuContext)

import { createContext, useContext } from 'react'

import type { ApiTabItem } from './ApiTab.type'

interface TabContentContextData {
  tabData: ApiTabItem
}

const TabContentContext = createContext({} as TabContentContextData)

export function TabContentProvider(
  props: React.PropsWithChildren<Pick<TabContentContextData, 'tabData'>>
) {
  const { children, tabData } = props

  return <TabContentContext.Provider value={{ tabData }}>{children}</TabContentContext.Provider>
}

export const useTabContentContext = () => useContext(TabContentContext)

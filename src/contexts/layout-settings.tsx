import { createContext, useContext, useRef, useState } from 'react'
import type { ImperativePanelHandle } from 'react-resizable-panels'

interface LayoutContextData {
  isSideMenuCollapsed: boolean
  setIsSideMenuCollapsed: React.Dispatch<
    React.SetStateAction<LayoutContextData['isSideMenuCollapsed']>
  >
  panelRef: React.RefObject<ImperativePanelHandle>
}

const LayoutContext = createContext({} as LayoutContextData)

export function LayoutProvider(props: React.PropsWithChildren) {
  const panelRef = useRef<ImperativePanelHandle>(null)

  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useState(false)

  return (
    <LayoutContext.Provider value={{ panelRef, isSideMenuCollapsed, setIsSideMenuCollapsed }}>
      {props.children}
    </LayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(LayoutContext)

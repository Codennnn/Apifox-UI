'use client'

import { createContext, useContext } from 'react'

import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { message, Modal } from 'antd'

import { MenuHelpersContextProvider } from '@/contexts/menu-helpers'

type ModalHookApi = ReturnType<typeof Modal.useModal>[0]
type MessageApi = ReturnType<typeof message.useMessage>[0]

interface GlobalContextData {
  modal: ModalHookApi
  messageApi: MessageApi
}

const GlobalContext = createContext({} as GlobalContextData)

export function GlobalContextProvider(props: React.PropsWithChildren) {
  const { children } = props

  const [modal, modalContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage({ duration: 1 })

  return (
    <MenuHelpersContextProvider>
      <NiceModalProvider>
        <GlobalContext.Provider
          value={{
            modal,
            messageApi,
          }}
        >
          {children}

          {modalContextHolder}
          {messageContextHolder}
        </GlobalContext.Provider>
      </NiceModalProvider>
    </MenuHelpersContextProvider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)

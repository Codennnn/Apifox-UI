'use client'

import { useLayoutEffect, useState } from 'react'
import { Panel, PanelGroup, type PanelProps, PanelResizeHandle } from 'react-resizable-panels'

import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { Button, ConfigProvider, Dropdown, Flex, message, Modal, theme, Tooltip } from 'antd'
import { ChevronRightIcon, FilterIcon, PlusIcon } from 'lucide-react'

import { ApiMenu } from '@/components/ApiMenu'
import { ApiMenuContextProvider } from '@/components/ApiMenu/ApiMenuContext'
import { ApiTab } from '@/components/ApiTab'
import { FooterBar } from '@/components/FooterBar'
import { HeaderNav } from '@/components/HeaderNav'
import { FileIcon } from '@/components/icons/FileIcon'
import { IconText } from '@/components/IconText'
import { InputSearch } from '@/components/InputSearch'
import { SideNav } from '@/components/SideNav'
import { API_MENU_CONFIG } from '@/configs/static'
import { GlobalContextProvider } from '@/contexts/global'
import { LayoutProvider, useLayoutContext } from '@/contexts/layout-settings'
import { MenuItemType } from '@/enums'
import { getCatalogType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'
import { useStyles } from '@/hooks/useStyle'

import { MenuTabProvider } from '../contexts/menu-tab-settings'

import { css } from '@emotion/css'

function HomeContent() {
  const { token } = theme.useToken()

  const { panelRef, isSideMenuCollapsed, setIsSideMenuCollapsed } = useLayoutContext()

  const { createTabItem } = useHelpers()

  const { styles } = useStyles(({ token }) => {
    const resizeHandleInner = css({
      backgroundColor: token.colorBorderSecondary,
    })

    return {
      resizeHandle: css({
        [`&:hover > .${resizeHandleInner}, &[data-resize-handle-state="hover"] > .${resizeHandleInner}, &[data-resize-handle-state="drag"] > .${resizeHandleInner}`]:
          {
            backgroundColor: token.colorPrimary,
          },
      }),

      resizeHandleInner,

      expandTrigger: css({
        color: token.colorPrimary,
        backgroundColor: token.colorFillAlter,
        boxShadow: `1px 0 4px rgba(16 24 40 / 0.08)`,
        '&:hover': {
          backgroundColor: token.colorFillSecondary,
        },
      }),
    }
  })

  const [defaultSize, setDefaultSize] = useState<PanelProps['defaultSize']>()
  const [minSize, setMinSize] = useState<PanelProps['minSize']>()

  useLayoutEffect(() => {
    const panelGroup = document.querySelector('#panel-group')

    if (panelGroup instanceof HTMLElement) {
      setDefaultSize((280 / panelGroup.offsetWidth) * 100)
      setMinSize((200 / panelGroup.offsetWidth) * 100)
    }
  }, [])

  return (
    <div className="flex h-full" style={{ backgroundColor: token.colorFillTertiary }}>
      <SideNav />

      <div className="flex h-full flex-1 flex-col overflow-hidden pb-main pr-main">
        <div className="h-10 overflow-hidden">
          <HeaderNav />
        </div>

        <div
          className="relative flex-1 overflow-y-auto border border-solid"
          style={{
            borderColor: token.colorFillSecondary,
            backgroundColor: token.colorBgContainer,
            borderRadius: 10,
          }}
        >
          <PanelGroup direction="horizontal" id="panel-group">
            {!!defaultSize && !!minSize && (
              <>
                <Panel
                  ref={panelRef}
                  collapsible
                  className="flex h-full flex-col overflow-hidden py-2"
                  defaultSize={defaultSize}
                  id="side"
                  maxSize={50}
                  minSize={minSize}
                  order={1}
                  onCollapse={() => {
                    setIsSideMenuCollapsed(true)
                  }}
                  onExpand={() => {
                    setIsSideMenuCollapsed(false)
                  }}
                >
                  <Flex gap={token.paddingXXS} style={{ padding: token.paddingXS }}>
                    <InputSearch />

                    <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            paddingInline: token.paddingXS,
                            defaultBorderColor: token.colorBorderSecondary,
                          },
                        },
                      }}
                    >
                      <Tooltip title="显示筛选条件">
                        <Button>
                          <IconText icon={<FilterIcon size={16} />} />
                        </Button>
                      </Tooltip>

                      <Dropdown
                        menu={{
                          items: [
                            ...[
                              MenuItemType.ApiDetail,
                              MenuItemType.HttpRequest,
                              MenuItemType.Doc,
                              MenuItemType.ApiSchema,
                            ].map((t) => {
                              const { newLabel } = API_MENU_CONFIG[getCatalogType(t)]

                              return {
                                key: t,
                                label: t === MenuItemType.Doc ? '新建 Markdown' : newLabel,
                                icon: (
                                  <FileIcon
                                    size={16}
                                    style={{ color: token.colorPrimary }}
                                    type={t}
                                  />
                                ),
                                onClick: () => {
                                  createTabItem(t)
                                },
                              }
                            }),
                          ],
                        }}
                      >
                        <Button type="primary">
                          <IconText icon={<PlusIcon size={18} />} />
                        </Button>
                      </Dropdown>
                    </ConfigProvider>
                  </Flex>

                  <div className="ui-menu flex-1 overflow-y-auto">
                    <ApiMenuContextProvider>
                      <ApiMenu />
                    </ApiMenuContextProvider>
                  </div>
                </Panel>

                <PanelResizeHandle className={`relative basis-px ${styles.resizeHandle}`}>
                  <div className={`h-full w-px ${styles.resizeHandleInner}`} />
                </PanelResizeHandle>
              </>
            )}

            <Panel
              className="relative flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden"
              id="main"
              order={2}
            >
              <div className="flex-1 overflow-auto">
                <ApiTab />
              </div>

              <div
                className="shrink-0 basis-9"
                style={{ borderTop: `1px solid ${token.colorBorderSecondary}` }}
              >
                <FooterBar />
              </div>
            </Panel>
          </PanelGroup>

          {isSideMenuCollapsed && (
            <div
              className={`absolute left-0 top-1/2 z-50 flex h-12 w-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-r-lg ${styles.expandTrigger}`}
              onClick={() => {
                panelRef.current?.expand()
              }}
            >
              <ChevronRightIcon size={12} strokeWidth={3} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function HomePage() {
  const [modal, modalContextHolder] = Modal.useModal()
  const [messageApi, messageContextHolder] = message.useMessage({ duration: 1 })

  return (
    <LayoutProvider>
      <GlobalContextProvider messageApi={messageApi} modal={modal}>
        <NiceModalProvider>
          <MenuTabProvider>
            <HomeContent />

            {modalContextHolder}
            {messageContextHolder}
          </MenuTabProvider>
        </NiceModalProvider>
      </GlobalContextProvider>
    </LayoutProvider>
  )
}

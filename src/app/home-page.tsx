'use client'

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'

import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { Button, ConfigProvider, Flex, theme, Tooltip } from 'antd'
import { FilterIcon, PlusIcon } from 'lucide-react'

import { ApiMenu } from '@/components/ApiMenu'
import { ApiMenuContextProvider } from '@/components/ApiMenu/ApiMenuContext'
import { ApiTab } from '@/components/ApiTab'
import { FooterBar } from '@/components/FooterBar'
import { IconText } from '@/components/IconText'
import { SearchInput } from '@/components/SearchInput'
import { GlobalContextProvider } from '@/contexts/global'
import { LayoutProvider, useLayoutContext } from '@/contexts/layout-settings'
import { useStyles } from '@/hooks/useStyle'

import { MenuTabProvider } from '../contexts/menu-tab-settings'

import { css } from '@emotion/css'

function HomeContent() {
  const { token } = theme.useToken()

  const { panelRef, setIsSideMenuCollapsed } = useLayoutContext()

  const { styles } = useStyles(({ token }) => {
    const resizeHandleInner = css({
      backgroundColor: token.colorBorderSecondary,
    })

    return {
      resizeHandle: css({
        [`&:hover > .${resizeHandleInner}, &[data-resize-handle-active] > .${resizeHandleInner}`]: {
          backgroundColor: token.colorPrimary,
        },
      }),

      resizeHandleInner,
    }
  })

  return (
    <div className="flex h-full" style={{ backgroundColor: token.colorBgContainer }}>
      {/* <SideNav /> */}

      <PanelGroup direction="horizontal">
        <Panel
          ref={panelRef}
          collapsible
          className="flex h-full flex-col overflow-hidden py-2"
          defaultSize={15}
          minSize={15}
          style={{ backgroundColor: token.colorFillAlter }}
          onCollapse={() => {
            setIsSideMenuCollapsed(true)
          }}
          onExpand={() => {
            setIsSideMenuCollapsed(false)
          }}
        >
          <Flex gap={token.paddingXXS} style={{ padding: token.paddingXS }}>
            <SearchInput />

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    paddingInline: token.paddingXS,
                    defaultBg: token.colorFillTertiary,
                    defaultBorderColor: token.colorFillTertiary,
                  },
                },
              }}
            >
              <Tooltip title="显示筛选条件">
                <Button>
                  <IconText icon={<FilterIcon size={16} />} />
                </Button>
              </Tooltip>

              <Button type="primary">
                <IconText icon={<PlusIcon size={18} />} />
              </Button>
            </ConfigProvider>
          </Flex>

          <div className="app-menu flex-1 overflow-y-auto">
            <ApiMenuContextProvider>
              <ApiMenu />
            </ApiMenuContextProvider>
          </div>
        </Panel>

        <PanelResizeHandle className={`relative basis-[1px] ${styles.resizeHandle}`}>
          <div className={`h-full w-[1px] ${styles.resizeHandleInner}`} />
        </PanelResizeHandle>

        <Panel
          className="relative flex h-full flex-col overflow-y-auto overflow-x-hidden"
          minSize={50}
        >
          <div className="grow overflow-auto">
            <ApiTab />
          </div>

          <div className="h-9" style={{ borderTop: `1px solid ${token.colorBorderSecondary}` }}>
            <FooterBar />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export function HomePage() {
  return (
    <LayoutProvider>
      <NiceModalProvider>
        <GlobalContextProvider>
          <MenuTabProvider>
            <HomeContent />
          </MenuTabProvider>
        </GlobalContextProvider>
      </NiceModalProvider>
    </LayoutProvider>
  )
}

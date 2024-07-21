'use client'

import { useLayoutEffect, useState } from 'react'
import { Panel, PanelGroup, type PanelProps, PanelResizeHandle } from 'react-resizable-panels'

import { theme } from 'antd'
import { ChevronRightIcon } from 'lucide-react'

import { useLayoutContext } from '@/contexts/layout-settings'
import { useStyles } from '@/hooks/useStyle'

import { FooterBar } from '../components/FooterBar'

import { css } from '@emotion/css'

interface PanelLayoutProps {
  layoutName?: string
  left?: React.ReactNode
  right?: React.ReactNode
}

export function PanelLayout(props: PanelLayoutProps) {
  const { token } = theme.useToken()

  const { layoutName, left, right } = props

  const { panelRef, isSideMenuCollapsed, setIsSideMenuCollapsed } = useLayoutContext()

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
    <>
      <PanelGroup direction="horizontal" id="panel-group">
        {!!defaultSize && !!minSize && (
          <>
            <Panel
              ref={panelRef}
              collapsible
              className="flex h-full flex-col overflow-hidden"
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
              <div className="p-2">
                <span className="px-2 text-lg font-semibold">{layoutName}</span>
              </div>

              {left}
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
          <div className="flex-1 overflow-auto">{right}</div>

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
    </>
  )
}

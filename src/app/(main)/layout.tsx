'use client'

import { theme } from 'antd'

import { SideNav } from '@/app/(main)/components/SideNav'
import { HeaderNav } from '@/components/HeaderNav'
import { LayoutProvider } from '@/contexts/layout-settings'
import { useCssVariable } from '@/hooks/useCssVariable'

export default function MainLayout(props: React.PropsWithChildren) {
  const { token } = theme.useToken()

  const cssVar = useCssVariable()

  return (
    <div className="flex h-full" style={{ backgroundColor: token.colorFillTertiary, ...cssVar }}>
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
          <LayoutProvider>{props.children}</LayoutProvider>
        </div>
      </div>
    </div>
  )
}

'use client'

import { theme } from 'antd'

import { HeaderNav } from '@/components/HeaderNav'
import { SideNav } from '@/components/SideNav'

export default function MainLayout(props: React.PropsWithChildren) {
  const { token } = theme.useToken()

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
          {props.children}
        </div>
      </div>
    </div>
  )
}

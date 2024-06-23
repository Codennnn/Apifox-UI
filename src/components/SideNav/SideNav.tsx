import { theme } from 'antd'

import { IconLogo } from '@/components/icons/IconLogo'

import { NavMenu } from './NavMenu'

export function SideNav() {
  const { token } = theme.useToken()

  return (
    <div className="flex h-full shrink-0 basis-[80px] flex-col items-center overflow-y-auto overflow-x-hidden px-1 pt-layoutHeader">
      <div
        className="mb-5 mt-2 size-10 rounded-xl p-[6px]"
        style={{ color: token.colorText, border: `1px solid ${token.colorBorder}` }}
      >
        <IconLogo />
      </div>

      <NavMenu />
    </div>
  )
}

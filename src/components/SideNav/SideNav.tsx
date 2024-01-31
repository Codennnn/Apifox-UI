import { SettingFilled } from '@ant-design/icons'
import { show } from '@ebay/nice-modal-react'
import { Button, theme } from 'antd'

import { SettingsModal } from '@/components/modals/SettingsModal'

import { NavMenu } from './NavMenu'

export function SideNav() {
  const { token } = theme.useToken()

  return (
    <div
      className="box-border flex h-full w-[80px] flex-col items-center overflow-y-auto overflow-x-hidden px-1"
      style={{
        backgroundColor: token.colorFillQuaternary,
        borderRight: `1px solid ${token.colorBorderBg}`,
      }}
    >
      <NavMenu />

      <div className="mt-auto w-8 pb-4">
        <Button
          icon={<SettingFilled />}
          type="text"
          onClick={() => {
            void show(SettingsModal)
          }}
        />
      </div>
    </div>
  )
}

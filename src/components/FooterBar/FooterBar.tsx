import { show } from '@ebay/nice-modal-react'
import { Button, type ButtonProps, Space } from 'antd'
import { ChevronsLeftIcon, ChevronsRightIcon, HelpCircle, ShirtIcon } from 'lucide-react'

import { IconText } from '@/components/IconText'
import { SettingsModal } from '@/components/modals/SettingsModal'
import { useLayoutContext } from '@/contexts/layout-settings'

function SmallButton({ children, ...props }: React.PropsWithChildren<ButtonProps>) {
  return (
    <Button size="small" type="text" {...props}>
      {children}
    </Button>
  )
}

export function FooterBar() {
  const { panelRef, isSideMenuCollapsed } = useLayoutContext()

  return (
    <div className="flex h-full items-center pl-3 pr-6">
      {isSideMenuCollapsed ? (
        <SmallButton
          onClick={() => {
            panelRef.current?.expand()
          }}
        >
          <IconText icon={<ChevronsRightIcon size={18} />} />
        </SmallButton>
      ) : (
        <SmallButton
          onClick={() => {
            panelRef.current?.collapse()
          }}
        >
          <IconText icon={<ChevronsLeftIcon size={18} />} />
        </SmallButton>
      )}

      <Space className="ml-auto flex items-center" size={0}>
        <SmallButton
          onClick={() => {
            void show(SettingsModal)
          }}
        >
          <IconText icon={<ShirtIcon size={14} />} />
        </SmallButton>

        <SmallButton>
          <IconText icon={<HelpCircle size={14} />} />
        </SmallButton>
      </Space>
    </div>
  )
}

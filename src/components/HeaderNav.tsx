import { show } from '@ebay/nice-modal-react'
import { Button, Space } from 'antd'
import { SettingsIcon } from 'lucide-react'

import { ModalSettings } from '@/components/modals/ModalSettings'

export function HeaderNav() {
  return (
    <div className="flex h-full items-center">
      <div className="ml-auto">
        <Space>
          <Button
            icon={<SettingsIcon size={14} />}
            type="text"
            onClick={() => {
              void show(ModalSettings)
            }}
          />
        </Space>
      </div>
    </div>
  )
}

import { Button, Skeleton, Space, theme } from 'antd'
import { HistoryIcon, Settings2Icon, XIcon } from 'lucide-react'

import { IconText } from '@/components/IconText'

export function ApiSidePanel(props: { open?: boolean; onClose?: () => void }) {
  const { token } = theme.useToken()

  const { open, onClose } = props

  return (
    <div
      className={`h-full overflow-hidden ${open ? 'flex' : 'hidden'}`}
      style={{
        borderLeft: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div style={{ width: 320 }}>
        <div
          className="flex h-[50px] items-center px-4 py-2"
          style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
        >
          <span className="text-base font-medium">历史记录</span>

          <Button
            className="ml-auto"
            size="small"
            type="text"
            onClick={() => {
              onClose?.()
            }}
          >
            <IconText icon={<XIcon size={16} />} />
          </Button>
        </div>

        <div className="p-4">
          <Skeleton />
          <Skeleton />
        </div>
      </div>

      <div
        className="h-full px-1 py-2"
        style={{ borderLeft: `1px solid ${token.colorBorderSecondary}` }}
      >
        <Space direction="vertical">
          <Button size="small" type="text">
            <IconText icon={<HistoryIcon size={16} />} />
          </Button>
          <Button size="small" type="text">
            <IconText icon={<Settings2Icon size={16} />} />
          </Button>
        </Space>
      </div>
    </div>
  )
}

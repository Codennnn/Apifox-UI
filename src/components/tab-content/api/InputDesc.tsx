import { useState } from 'react'

import { Button, Input, Modal, theme } from 'antd'
import { Maximize2Icon } from 'lucide-react'

import { IconText } from '@/components/IconText'
import { MarkdownEditor } from '@/components/MarkdownEditor'

export function InputDesc({
  value,
  onChange,
}: Pick<React.ComponentProps<typeof Input.TextArea>, 'onChange'> & { value?: string }) {
  const { token } = theme.useToken()

  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <Input.TextArea placeholder="支持 Markdown 格式" rows={3} value={value} onChange={onChange} />

      <div className="absolute right-1 top-1 z-50">
        <Button
          size="small"
          type="text"
          onClick={() => {
            setOpen(true)
          }}
        >
          <IconText icon={<Maximize2Icon size={12} />} />
        </Button>
      </div>

      <Modal
        open={open}
        title="接口说明"
        width={1200}
        onCancel={() => {
          setOpen(false)
        }}
      >
        <div
          className="min-h-96 overflow-hidden"
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
          }}
        >
          <MarkdownEditor value={value || ''} />
        </div>
      </Modal>
    </div>
  )
}

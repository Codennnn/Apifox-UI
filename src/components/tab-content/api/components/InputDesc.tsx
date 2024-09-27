import { useState } from 'react'

import { Button, Input, Modal, theme } from 'antd'
import { Maximize2Icon } from 'lucide-react'

import { IconText } from '@/components/IconText'
import { MarkdownEditor } from '@/components/MarkdownEditor'

/**
 * 接口说明输入框组件。
 */
export function InputDesc({
  value,
  onChange,
}: {
  value?: string
  onChange?: (value: string) => void
}) {
  const { token } = theme.useToken()

  const [open, setOpen] = useState(false)
  const [editorValue, setEditorValue] = useState('')

  return (
    <div className="relative">
      <Input.TextArea
        placeholder="支持 Markdown 格式"
        rows={3}
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value)
        }}
      />

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
        afterOpenChange={(opened) => {
          if (opened) {
            if (value) {
              setEditorValue(value)
            }
          } else {
            setEditorValue('')
          }
        }}
        maskClosable={false}
        open={open}
        title="接口说明"
        width={1200}
        onCancel={() => {
          setOpen(false)
        }}
        onOk={() => {
          setOpen(false)
          onChange?.(editorValue)
        }}
      >
        <div
          className="h-[calc(100vh_-_340px)] overflow-hidden [&_.bytemd]:border-t-0"
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
          }}
        >
          <MarkdownEditor
            value={editorValue}
            onChange={(val) => {
              setEditorValue(val)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

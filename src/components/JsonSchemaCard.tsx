import { useState } from 'react'

import { Modal, Space, theme } from 'antd'
import { BracesIcon, CopyIcon } from 'lucide-react'

import {
  type JsonSchema,
  JsonSchemaEditor,
  type JsonSchemaEditorProps,
} from '@/components/JsonSchema'
import { MonacoEditor } from '@/components/MonacoEditor'
import { useGlobalContext } from '@/contexts/global'

import { UIButton } from './UIBtn'

type JsonSchemaCardProps = Pick<JsonSchemaEditorProps, 'value' | 'onChange'>

export function JsonSchemaCard(props: JsonSchemaCardProps) {
  const { token } = theme.useToken()

  const { value, onChange } = props

  const [editorValue, setEditorValue] = useState<string>()

  const { messageApi } = useGlobalContext()
  const [schemaModalOpen, setSchemaModalOpen] = useState(false)

  return (
    <>
      <div
        style={{
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: token.borderRadius,
          marginBottom: token.marginSM,
        }}
      >
        <div
          className="flex gap-2"
          style={{
            padding: token.paddingSM,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <UIButton primary>通过 JSON 生成</UIButton>

          <div className="ml-auto">
            <Space>
              <UIButton
                onClick={() => {
                  setSchemaModalOpen(true)
                }}
              >
                <span className="inline-flex items-center gap-1">
                  <BracesIcon size={12} /> JSON Schema
                </span>
              </UIButton>
            </Space>
          </div>
        </div>

        <div style={{ padding: token.paddingSM }}>
          <JsonSchemaEditor defaultExpandAll value={value} onChange={onChange} />
        </div>
      </div>

      <Modal
        afterOpenChange={(opened) => {
          if (opened) {
            setEditorValue(JSON.stringify(value, null, 2))
          } else {
            setEditorValue(undefined)
          }
        }}
        maskClosable={false}
        okText="保存"
        open={schemaModalOpen}
        title="JSON Schema"
        width={800}
        onCancel={() => {
          setSchemaModalOpen(false)
        }}
        onOk={() => {
          if (editorValue) {
            try {
              onChange?.(JSON.parse(editorValue) as JsonSchema)
              setSchemaModalOpen(false)
            } catch (err) {
              if (err instanceof SyntaxError) {
                messageApi.error('JSON Schema 格式校验不通过，请检查！')
              }
            }
          }
        }}
      >
        <div
          style={{
            borderRadius: token.borderRadius,
            border: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div
            className="flex justify-end"
            style={{
              padding: `${token.paddingXS}px ${token.paddingSM}px`,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <UIButton
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(value, null, 2)).then(() => {
                  messageApi.success('已复制')
                })
              }}
            >
              <span className="inline-flex items-center gap-1">
                <CopyIcon size={12} />
                复制代码
              </span>
            </UIButton>
          </div>
          <MonacoEditor
            className="h-[350px]"
            language="json"
            value={editorValue}
            onChange={(val) => {
              if (typeof val === 'string') {
                setEditorValue(val)
              } else {
                setEditorValue(JSON.stringify(val, null, 2))
              }
            }}
          />
        </div>
      </Modal>
    </>
  )
}

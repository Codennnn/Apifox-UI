import { useState } from 'react'

import { Modal, Space, theme } from 'antd'
import { BracesIcon, CopyIcon, ScanTextIcon } from 'lucide-react'

import {
  type JsonSchema,
  JsonSchemaEditor,
  type JsonSchemaEditorProps,
} from '@/components/JsonSchema'
import { MonacoEditor } from '@/components/MonacoEditor'
import { useGlobalContext } from '@/contexts/global'

import { UIButton } from './UIBtn'

interface JsonSchemaCardProps
  extends Pick<JsonSchemaEditorProps, 'value' | 'onChange' | 'defaultValue'> {
  editorProps?: JsonSchemaEditorProps
}

export function JsonSchemaCard(props: JsonSchemaCardProps) {
  const { token } = theme.useToken()

  const { defaultValue, value = defaultValue, onChange, editorProps } = props

  const [jsonStr, setJsonStr] = useState<string>()
  const [jsonSchemeStr, setJsonSchemeStr] = useState<string>()

  const { messageApi } = useGlobalContext()
  const [jsonModalOpen, setJsonModalOpen] = useState(false)
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
          <UIButton
            primary
            className="inline-flex items-center"
            onClick={() => {
              setJsonModalOpen(true)
            }}
          >
            <ScanTextIcon size={14} />
            <span className="ml-1">通过 JSON 生成</span>
          </UIButton>

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
          <JsonSchemaEditor value={value} onChange={onChange} {...editorProps} />
        </div>
      </div>

      <Modal
        afterOpenChange={(opened) => {
          if (opened) {
            setJsonStr(JSON.stringify(value, null, 2))
          } else {
            setJsonStr(undefined)
          }
        }}
        maskClosable={false}
        okText="保存"
        open={jsonModalOpen}
        title="JSON Schema"
        width={800}
        onCancel={() => {
          setJsonModalOpen(false)
        }}
        onOk={() => {
          if (jsonSchemeStr) {
            try {
              setJsonModalOpen(false)
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
            style={{
              padding: `${token.paddingXS}px ${token.paddingSM}px`,
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            输入 JSON
          </div>

          <MonacoEditor
            className="h-[350px]"
            language="json"
            value={jsonStr}
            onChange={(val) => {
              if (typeof val === 'string') {
                setJsonStr(val)
              } else {
                setJsonStr(JSON.stringify(val, null, 2))
              }
            }}
          />
        </div>
      </Modal>

      <Modal
        afterOpenChange={(opened) => {
          if (opened) {
            setJsonSchemeStr(JSON.stringify(value, null, 2))
          } else {
            setJsonSchemeStr(undefined)
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
          if (jsonSchemeStr) {
            try {
              onChange?.(JSON.parse(jsonSchemeStr) as JsonSchema)
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
            value={jsonSchemeStr}
            onChange={(val) => {
              if (typeof val === 'string') {
                setJsonSchemeStr(val)
              } else {
                setJsonSchemeStr(JSON.stringify(val, null, 2))
              }
            }}
          />
        </div>
      </Modal>
    </>
  )
}

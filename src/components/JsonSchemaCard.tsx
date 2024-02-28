import { Button, Space, theme } from 'antd'

import { JsonSchemaEditor, type JsonSchemaEditorProps } from '@/components/JsonSchema'

type JsonSchemaCardProps = Pick<JsonSchemaEditorProps, 'value' | 'onChange'>

export function JsonSchemaCard(props: JsonSchemaCardProps) {
  const { token } = theme.useToken()

  const { value, onChange } = props

  return (
    <div
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
        marginBottom: token.marginSM,
      }}
    >
      <div
        className="flex justify-end"
        style={{
          padding: token.paddingSM,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <Space size={token.paddingXXS}>
          <Button size="small" type="text">
            生成代码
          </Button>
          <Button size="small" type="text">
            JSON Schema
          </Button>
        </Space>
      </div>

      <div style={{ padding: token.paddingSM }}>
        <JsonSchemaEditor value={value} onChange={onChange} />
      </div>
    </div>
  )
}

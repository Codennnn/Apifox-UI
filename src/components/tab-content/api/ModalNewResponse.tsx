import { Form, Input, Modal, type ModalProps, Select, type SelectProps } from 'antd'

import { SchemaType } from '@/components/JsonSchema'
import { HTTP_CODE_CONFIG } from '@/configs/static'
import { ContentType } from '@/enums'
import type { ApiDetailsResponse } from '@/types'

export const httpCodeOptions: SelectProps['options'] = Object.entries(HTTP_CODE_CONFIG).map(
  ([, { text, value, desc }]) => {
    return {
      label: value,
      value,
      text,
      desc,
    }
  }
)

export const contentTypeOptions: SelectProps['options'] = [
  { label: 'JSON', value: ContentType.JSON },
  { label: 'XML', value: ContentType.XML },
  { label: 'HTML', value: ContentType.HTML },
  { label: 'Raw', value: ContentType.Raw },
  { label: 'Binary', value: ContentType.Binary },
]

type FormData = Pick<ApiDetailsResponse, 'name' | 'code' | 'contentType' | 'jsonSchema'>

interface ModalNewResponseProps extends ModalProps {
  onFinish?: (data: FormData) => void
}

export function ModalNewResponse(props: ModalNewResponseProps) {
  const { onFinish, ...rest } = props

  const [form] = Form.useForm<FormData>()

  return (
    <Modal
      {...rest}
      title="添加响应"
      onOk={() => {
        form.validateFields().then((values) => {
          onFinish?.(values)
        })
      }}
    >
      <Form<FormData>
        form={form}
        initialValues={{
          name: '成功',
          code: 200,
          contentType: ContentType.JSON,
          jsonSchema: {
            type: SchemaType.Object,
            properties: [],
          },
        }}
        layout="vertical"
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="HTTP 状态码" name="code" rules={[{ required: true }]}>
          <Select options={httpCodeOptions} />
        </Form.Item>

        <Form.Item label="内容格式" name="contentType">
          <Select options={contentTypeOptions} />
        </Form.Item>

        <Form.Item hidden name="jsonSchema">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

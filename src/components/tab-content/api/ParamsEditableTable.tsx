import { Input, Select } from 'antd'

import { EditableTable } from '@/components/EditableTable'
import { ParamType } from '@/enums'
import type { Parameter } from '@/types'

interface ParamsEditableTableProps {
  value?: Parameter[]
  onChange?: (value: ParamsEditableTableProps['value']) => void
}

export function ParamsEditableTable(props: ParamsEditableTableProps) {
  const { value, onChange } = props

  const handleChange = (v: Partial<Record<keyof Parameter, any>>, idx: number) => {
    onChange?.(
      value?.map((it, i) => {
        if (i === idx) {
          return { ...it, ...v }
        }

        return it
      })
    )
  }

  return (
    <EditableTable
      columns={[
        {
          title: '参数名',
          dataIndex: 'name',
          width: '25%',
          render: (text) => {
            return <div className="p-1">{text}</div>
          },
        },
        {
          title: '类型',
          dataIndex: 'type',
          width: 90,
          render: (text, _, idx) => {
            return (
              <Select
                options={[
                  { label: 'string', value: ParamType.String },
                  { label: 'integer', value: ParamType.Integer },
                  { label: 'boolean', value: ParamType.Boolean },
                  { label: 'number', value: ParamType.Number },
                  { label: 'array', value: ParamType.Array },
                ]}
                suffixIcon={null}
                value={text}
                variant="borderless"
                onChange={(val) => {
                  handleChange({ type: val }, idx)
                }}
              />
            )
          },
        },
        {
          title: '示例值',
          dataIndex: 'example',
          width: '25%',
          render: (text, _, idx) => {
            return (
              <Input
                size="small"
                value={text}
                variant="borderless"
                onChange={(ev) => {
                  handleChange({ example: ev.target.value }, idx)
                }}
              />
            )
          },
        },

        {
          title: '说明',
          dataIndex: 'description',
          width: '40%',
          render: (text, _, idx) => {
            return (
              <div className="py-0">
                <Input.TextArea
                  autoSize
                  rows={1}
                  size="small"
                  value={text}
                  variant="borderless"
                  onChange={(ev) => {
                    handleChange({ description: ev.target.value }, idx)
                  }}
                />
              </div>
            )
          },
        },
        { title: '', dataIndex: 'title', width: 90 },
      ]}
      dataSource={value}
    />
  )
}

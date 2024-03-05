import { Select, type SelectProps } from 'antd'

const serviceOptions: SelectProps['options'] = [
  {
    label: '默认设置',
    options: [
      {
        label: (
          <span className="flex items-center justify-between font-normal">
            <span>继承父级</span>
            <span className="ml-10 truncate opacity-50">跟随父级目录设置（推荐）</span>
          </span>
        ),
        value: '',
      },
    ],
  },
  {
    label: '手动指定',
    options: [
      {
        label: (
          <span className="flex items-center justify-between font-normal">
            <span>默认服务</span>
          </span>
        ),
        value: 'default',
      },
    ],
  },
]

interface SelectorServiceProps {
  value?: string
  onChange?: (value: SelectorServiceProps['value']) => void
}

export function SelectorService(props: SelectorServiceProps) {
  return <Select {...props} options={serviceOptions} />
}

import { useRef } from 'react'

import { Input, type InputProps } from 'antd'

import { useGlobalContext } from '@/contexts/global'

interface PathInputProps {
  value?: string
  onChange?: (value: PathInputProps['value']) => void
}

export function PathInput(props: PathInputProps) {
  const { value, onChange } = props

  const msgKey = useRef<string>()
  const { messageApi } = useGlobalContext()

  const handleInputChange: InputProps['onChange'] = (ev) => {
    const val = ev.target.value

    if (val.endsWith('?')) {
      msgKey.current = 'x'

      if (msgKey.current) {
        messageApi.info({
          key: msgKey.current,
          content: (
            <span>
              Query 参数请在下方<strong>请求参数</strong>中填写
            </span>
          ),
          duration: 3,
          onClose: () => {
            msgKey.current = undefined
          },
        })
      }
    } else {
      onChange?.(val)
    }
  }

  return <Input placeholder="接口路径，“/”起始" value={value} onChange={handleInputChange} />
}

import { useRef } from 'react'

import { Input, type InputProps } from 'antd'
import { nanoid } from 'nanoid'

import { useGlobalContext } from '@/contexts/global'
import type { Parameter } from '@/types'

export interface PathInputProps {
  value?: string
  onChange?: (value: PathInputProps['value']) => void
  onParseQueryParams?: (queryParams?: Parameter[]) => void
}

export function PathInput(props: PathInputProps) {
  const { value, onChange, onParseQueryParams } = props

  const { messageApi } = useGlobalContext()
  const msgKey = useRef<string>()

  const handleInputChange: InputProps['onChange'] = (ev) => {
    const val = ev.target.value

    if (val.endsWith('?')) {
      if (!msgKey.current) {
        msgKey.current = '_'
      }

      messageApi.info({
        key: msgKey.current, // 用户可能会重复键入 “?”，因此需要避免重复显示提示。
        content: (
          <span>
            Query&nbsp;参数请在下方<strong>请求参数</strong>中填写
          </span>
        ),
        duration: 3,
        onClose: () => {
          msgKey.current = undefined
        },
      })

      // 移除掉末尾的 “?”。
      onChange?.(val.slice(0, val.length - 1))
    } else if (val.endsWith('#')) {
      if (!msgKey.current) {
        msgKey.current = '_'
      }

      messageApi.info({
        key: msgKey.current,
        content: <span>接口路径不支持填写&nbsp;URL&nbsp;hash(#)</span>,
        duration: 3,
        onClose: () => {
          msgKey.current = undefined
        },
      })

      onChange?.(val.slice(0, val.length - 1))
    } else {
      let finalVal = val

      const queryParams: Parameter[] = []

      try {
        const Url = new URL(val.startsWith('http') ? val : `http://xxx.com/${val}`)

        Url.searchParams.forEach((value, key) => {
          queryParams.push({
            id: nanoid(4),
            name: key,
            example: value,
          })
        })

        if (queryParams.length > 0) {
          onParseQueryParams?.(queryParams)
        }

        finalVal = val.replace(Url.search, '').replace(Url.hash, '')
      } catch {
        //
      }

      onChange?.(finalVal)
    }
  }

  return <Input placeholder="接口路径，“/”起始" value={value} onChange={handleInputChange} />
}

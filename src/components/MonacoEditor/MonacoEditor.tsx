import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import { Editor, type EditorProps } from '@monaco-editor/react'
import { merge } from 'lodash-es'

import { deserialize, isPureObject, serialize } from '@/utils'

type EditorMountParams = Parameters<NonNullable<EditorProps['onMount']>>
type EditorInstance = EditorMountParams[0]
type MonacoInstance = EditorMountParams[1]

const defaultEditorOptions: EditorProps['options'] = {
  tabSize: 2,
  minimap: { enabled: false },
  autoIndent: 'full',
}

export interface MonacoEditorProps<ValueType = unknown>
  extends Omit<EditorProps, 'value' | 'onChange' | 'defaultValue'> {
  defaultValue?: ValueType
  value?: ValueType
  onChange?: (value: MonacoEditorProps['value']) => void

  /** 是否在 onChange 事件触发前反序列化字符串。 */
  deserializeOnChange?: boolean
  useDefaultValue?: boolean
}

export interface MonacoEditorRef<ValueType = unknown> {
  editor: EditorInstance | undefined
  monaco: MonacoInstance | undefined
  getDeserializeValue: () => ValueType
}

function EditorX<ValueType = unknown>(
  props: MonacoEditorProps<ValueType>,
  ref: React.Ref<MonacoEditorRef<ValueType>>
) {
  const {
    defaultValue,
    value = defaultValue,
    onChange,
    deserializeOnChange = true,
    useDefaultValue,
    ...editorProps
  } = props

  const [editorMounted, setEditorMounted] = useState(false)

  const editorRef = useRef<EditorInstance>()
  const monacoRef = useRef<MonacoInstance>()

  useImperativeHandle(
    ref,
    () => {
      return {
        editor: editorRef.current,
        monaco: monacoRef.current,
        getDeserializeValue: () => deserialize(editorRef.current?.getValue()),
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorMounted]
  )

  // 转换 value 为字符串，以便编辑器能正确显示。
  const getEditorValue = (value: any): string | undefined => {
    if (isPureObject(value)) {
      return serialize(value, { space: 2, unsafe: true })
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value
  }

  const valueObj = useDefaultValue
    ? { defaultValue: getEditorValue(value) }
    : { value: getEditorValue(value) }

  return (
    <>
      <Editor
        defaultLanguage="javascript"
        loading="初次加载可能耗时较久，请耐心等待..."
        {...editorProps}
        {...valueObj}
        options={merge(defaultEditorOptions, editorProps.options)}
        onChange={(val) => {
          let changedValue: any
          try {
            changedValue = deserializeOnChange ? deserialize(val) : val
          } catch {
            changedValue = val
          }
          onChange?.(changedValue)
        }}
        onMount={(editor, monaco) => {
          editorProps.onMount?.(editor, monaco)
          editorRef.current = editor
          monacoRef.current = monaco
          setEditorMounted(true)
        }}
      />
    </>
  )
}

/**
 * 对 monaco editor 进行简单的封装，使其更容易适配表单受控组件（即 value/onChange 的受控形式）。
 */
export const MonacoEditor = forwardRef(EditorX)

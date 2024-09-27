import { useEffect, useRef, useState } from 'react'

import { produce } from 'immer'
import { get, set } from 'lodash-es'

import { defaultFieldData, KEY_ITEMS, KEY_PROPERTIES, SchemaType } from './constants'
import { JsonSchemaContextProvider } from './JsonSchema.context'
import type { ArraySchema, ColumnType, FieldPath, JsonSchema } from './JsonSchema.type'
import { JsonSchemaNode, type JsonSchemaNodeProps } from './JsonSchemaNode'
import { getAllExpandedKeys } from './utils'

export interface JsonSchemaEditorProps extends Pick<JsonSchemaNodeProps, 'value' | 'onChange'> {
  defaultExpandAll?: boolean
  defaultValue?: JsonSchemaEditorProps['value']

  readOnly?: boolean
  expandedKeys?: string[]
  onExpand?: (expandedKeys: JsonSchemaEditorProps['expandedKeys']) => void
  extraColumns?: ColumnType[]
}

export function JsonSchemaEditor(props: JsonSchemaEditorProps) {
  const {
    defaultExpandAll = false,
    defaultValue,
    value = defaultValue,
    onChange,
    ...restRenderProps
  } = props

  const [expandedKeys, setExpandedKeys] = useState<JsonSchemaEditorProps['expandedKeys']>()

  const hasSetDefaultExpandedKeys = useRef(false)

  useEffect(() => {
    if (!hasSetDefaultExpandedKeys.current && defaultExpandAll && value) {
      const keys = getAllExpandedKeys(value)
      setExpandedKeys(keys)
      hasSetDefaultExpandedKeys.current = true
    }
  }, [defaultExpandAll, value])

  useEffect(() => {
    if (restRenderProps.expandedKeys) {
      setExpandedKeys(restRenderProps.expandedKeys)
    }
  }, [restRenderProps.expandedKeys])

  const handleAddField = (targetPath: FieldPath[]) => {
    if (!value) {
      return
    }

    const newJsonSchema = produce(value, (draft) => {
      const shouldAddToProperties = targetPath.at(-2) === KEY_PROPERTIES
      const shouldAddToItems = targetPath.at(-1) === KEY_ITEMS

      if (shouldAddToProperties) {
        // 根据目标字段路径获取到目标字段的 schema。
        const targetSchema: JsonSchema | undefined = get(draft, targetPath)

        if (targetSchema) {
          // 在相邻的字段后面添加一个字段。
          const propertyIdx = Number(targetPath.pop())

          if (propertyIdx >= 0) {
            const properties = get(draft, targetPath)

            if (Array.isArray(properties)) {
              properties.splice(propertyIdx + 1, 0, defaultFieldData)
            }
          }
        } else {
          // 如果目标字段不存在，则直接创建出一个字段。
          set(draft, targetPath, defaultFieldData)
        }
      } else if (shouldAddToItems) {
        const targetItems: ArraySchema['items'] | undefined = get(draft, targetPath)
        if (targetItems && targetItems.type === SchemaType.Object) {
          targetItems.properties
            ? targetItems.properties.push(defaultFieldData)
            : (targetItems.properties = [defaultFieldData])
        }
      }
    })

    onChange?.(newJsonSchema)
  }

  const handleRemoveField = (targetPath: FieldPath[]) => {
    const newData = produce(value, (draft) => {
      if (targetPath.at(-2) === KEY_PROPERTIES) {
        const propertyIdx = Number(targetPath.pop())

        if (propertyIdx >= 0) {
          const properties = get(draft, targetPath)

          if (Array.isArray(properties)) {
            properties.splice(propertyIdx, 1)
          }
        }
      }
    })

    onChange?.(newData)
  }

  return (
    <JsonSchemaContextProvider
      value={{
        ...restRenderProps,
        expandedKeys,
        onExpand: (ks) => {
          setExpandedKeys(ks)
        },
      }}
    >
      <JsonSchemaNode
        {...restRenderProps}
        value={value}
        onAddField={handleAddField}
        onChange={onChange}
        onRemoveField={handleRemoveField}
      />
    </JsonSchemaContextProvider>
  )
}

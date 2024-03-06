import { theme } from 'antd'

import { useStyles } from '@/hooks/useStyle'

import { columnHeight, INDENT, items_key, properties_key, SchemaType, SEPARATOR } from './constants'
import { useJsonSchemaContext } from './JsonSchema.context'
import type { JsonSchema, ObjectSchema, PrimitiveSchema } from './JsonSchema.type'
import { JsonSchemaNodeRow, type JsonSchemaNodeRowProps } from './JsonSchemaNodeRow'
import { getNodeLevelInfo, getRefDataModel } from './utils'

import { css } from '@emotion/css'

const NodeWrapper = (
  props: React.PropsWithChildren<
    React.ComponentProps<'div'> & { shouldExpand: boolean; isRefModel?: boolean }
  >
) => {
  const { children, shouldExpand, isRefModel, className = '', style, ...rest } = props

  const { styles } = useStyles(({ token }) => {
    const ref = css(
      {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      },
      { label: 'ref-object' }
    )

    const node = css(
      {
        position: 'relative',

        '&:hover': {
          [`> .${ref}`]: {
            border: `1px solid ${token.colorPrimary}`,
          },
        },
      },
      { label: 'node' }
    )

    return { node, ref }
  })

  return (
    <div
      {...rest}
      className={`${styles.node} ${className}`}
      style={{ display: shouldExpand ? 'block' : 'none', ...style }}
    >
      {children}

      <div
        className={styles.ref}
        style={{
          display: isRefModel ? 'block' : 'none',
        }}
      />
    </div>
  )
}

export interface JsonSchemaNodeProps extends Omit<JsonSchemaNodeRowProps, 'value' | 'onChange'> {
  value?: JsonSchema
  onChange?: (value: JsonSchemaNodeProps['value']) => void
}

export function JsonSchemaNode(props: JsonSchemaNodeProps) {
  const { token } = theme.useToken()

  const { value, onChange, fieldPath = [], onAddField, ...restProps } = props

  const { expandedKeys } = useJsonSchemaContext()

  if (!value) {
    return null
  }

  const rowProps: JsonSchemaNodeRowProps = {
    fieldPath,
    onAddField,
    value,
    onChange,
    ...restProps,
  }

  switch (value.type) {
    case SchemaType.Object:
    case SchemaType.Array:
    case SchemaType.Refer: {
      const renderProps: JsonSchemaNodeProps = {
        onAddField,
        ...restProps,
      }

      const fieldPathKey = fieldPath.join(SEPARATOR)

      const shouldExpand = !!expandedKeys?.includes(fieldPathKey)

      if (value.type === SchemaType.Object) {
        return (
          <>
            <JsonSchemaNodeRow {...rowProps} />

            {Array.isArray(value.properties) && value.properties.length > 0 ? (
              <NodeWrapper shouldExpand={shouldExpand}>
                {value.properties.map((propSchema, i) => {
                  return (
                    <JsonSchemaNode
                      {...renderProps}
                      key={`${propSchema.type}_${i}`}
                      fieldPath={[...fieldPath, properties_key, `${i}`]}
                      value={propSchema}
                      onChange={(changValue) => {
                        const newProperties = value.properties!.map((prop, idx) => {
                          if (idx === i && changValue) {
                            return changValue
                          }
                          return prop
                        })

                        onChange?.({ ...value, properties: newProperties })
                      }}
                    />
                  )
                })}
              </NodeWrapper>
            ) : (
              <div
                className={css({
                  height: columnHeight,
                  display: shouldExpand ? 'flex' : 'none',
                  alignItems: 'center',
                })}
                style={{
                  paddingLeft:
                    getNodeLevelInfo([...fieldPath, properties_key, '0']).indentWidth + INDENT,
                }}
              >
                <span style={{ color: token.colorTextTertiary }}>
                  没有字段，
                  <span
                    className={css({ color: token.colorPrimary, cursor: 'pointer' })}
                    onClick={() => {
                      onAddField?.([...fieldPath, properties_key, '0'])
                    }}
                  >
                    添加
                  </span>
                </span>
              </div>
            )}
          </>
        )
      }

      if (value.type === SchemaType.Array) {
        return (
          <>
            <JsonSchemaNodeRow {...rowProps} />

            <NodeWrapper shouldExpand={shouldExpand}>
              <JsonSchemaNode
                {...renderProps}
                fieldPath={[...fieldPath, items_key]}
                value={value.items}
                onChange={(changValue) => {
                  onChange?.({
                    ...value,
                    items: changValue as ObjectSchema | PrimitiveSchema,
                  })
                }}
              />
            </NodeWrapper>
          </>
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value.type === SchemaType.Refer) {
        const { $ref } = value

        const refDataModel = getRefDataModel($ref)

        // 为了避免循环引用，需要判断一下，如果是同一个引用，就不再往下展示了。
        if ($ref !== restProps.fromRef) {
          return (
            <>
              <JsonSchemaNodeRow {...rowProps} />
              <NodeWrapper isRefModel shouldExpand={shouldExpand}>
                <JsonSchemaNode
                  fieldPath={[$ref, ...fieldPath]}
                  fromRef={$ref}
                  value={refDataModel}
                />
              </NodeWrapper>
            </>
          )
        }
      }

      return null
    }

    case SchemaType.Void:
    case SchemaType.Boolean:
    case SchemaType.Double:
    case SchemaType.Integer:
    case SchemaType.String: {
      return <JsonSchemaNodeRow {...rowProps} />
    }

    default:
      return null
  }
}

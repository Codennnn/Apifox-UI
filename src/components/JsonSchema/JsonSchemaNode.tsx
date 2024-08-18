import { theme } from 'antd'

import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useStyles } from '@/hooks/useStyle'

import { columnHeight, INDENT, KEY_ITEMS, KEY_PROPERTIES, SchemaType, SEPARATOR } from './constants'
import { useJsonSchemaContext } from './JsonSchema.context'
import type { ArraySchema } from './JsonSchema.type'
import { JsonSchemaNodeRow, type JsonSchemaNodeRowProps } from './JsonSchemaNodeRow'
import { JsonSchemaNodeWrapper } from './JsonSchemaNodeWrapper'
import { getNodeLevelInfo, getRefJsonSchema } from './utils'

import { css } from '@emotion/css'

export type JsonSchemaNodeProps = JsonSchemaNodeRowProps

export function JsonSchemaNode(props: JsonSchemaNodeProps) {
  const { token } = theme.useToken()

  const { value, onChange, fieldPath = [], onAddField, ...restProps } = props

  const { menuRawList } = useMenuHelpersContext()

  const { expandedKeys } = useJsonSchemaContext()

  const { styles } = useStyles(({ token }) => {
    const unbind = css({
      display: 'none',
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -100%)',
      backgroundColor: token.colorPrimaryBorderHover,
      padding: '2px 15px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      cursor: 'default',
    })

    const ref = css(
      {
        position: 'relative',
      },
      { label: 'ref-object' }
    )

    const node = css(
      {
        position: 'relative',

        '&:hover': {
          [`> .${ref}`]: {
            outline: `1px solid ${token.colorPrimaryBorderHover}`,
            borderRadius: token.borderRadiusSM,

            [`> .${unbind}`]: {
              display: 'flex',
            },
          },
        },
      },
      { label: 'node' }
    )

    return { unbind, node, ref }
  })

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
            {!restProps.fromRef && <JsonSchemaNodeRow {...rowProps} />}

            {Array.isArray(value.properties) && value.properties.length > 0 ? (
              <JsonSchemaNodeWrapper shouldExpand={!!restProps.fromRef || shouldExpand}>
                {value.properties.map((propSchema, i) => {
                  const key = `${propSchema.type}_${i}_${fieldPathKey}`

                  return (
                    <JsonSchemaNode
                      {...renderProps}
                      key={key}
                      fieldPath={[...fieldPath, KEY_PROPERTIES, `${i}`]}
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
              </JsonSchemaNodeWrapper>
            ) : (
              <div
                className={css({
                  height: columnHeight,
                  display: shouldExpand ? 'flex' : 'none',
                  alignItems: 'center',
                })}
                style={{
                  paddingLeft:
                    getNodeLevelInfo([...fieldPath, KEY_PROPERTIES, '0']).indentWidth + INDENT,
                }}
              >
                <span style={{ color: token.colorTextTertiary }}>
                  没有字段，
                  <span
                    className={css({ color: token.colorPrimary, cursor: 'pointer' })}
                    onClick={() => {
                      onAddField?.([...fieldPath, KEY_PROPERTIES, '0'])
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

            <JsonSchemaNodeWrapper shouldExpand={shouldExpand}>
              <JsonSchemaNode
                {...renderProps}
                fieldPath={[...fieldPath, KEY_ITEMS]}
                value={value.items}
                onChange={(changValue) => {
                  if (changValue) {
                    onChange?.({
                      ...value,
                      items: changValue as ArraySchema['items'],
                    })
                  }
                }}
              />
            </JsonSchemaNodeWrapper>
          </>
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (value.type === SchemaType.Refer) {
        const { $ref, ...restValue } = value

        if (menuRawList) {
          const refJsonSchema = getRefJsonSchema(menuRawList, $ref)

          // 为了避免循环引用，需要判断一下，如果是同一个引用，就不再往下展示了。
          return (
            <>
              <JsonSchemaNodeRow {...rowProps} />

              {$ref !== restProps.fromRef && (
                <JsonSchemaNodeWrapper className={styles.node} shouldExpand={shouldExpand}>
                  <div className={styles.ref}>
                    <div
                      className={styles.unbind}
                      onClick={() => {
                        if (refJsonSchema) {
                          onChange?.({
                            ...restValue,
                            ...refJsonSchema,
                          })
                        }
                      }}
                    >
                      解除关联
                    </div>

                    <JsonSchemaNode
                      disabled
                      fieldPath={[$ref, ...fieldPath]}
                      fromRef={$ref}
                      value={refJsonSchema}
                    />
                  </div>
                </JsonSchemaNodeWrapper>
              )}
            </>
          )
        }
      }

      return null
    }

    case SchemaType.Null:
    case SchemaType.Boolean:
    case SchemaType.Number:
    case SchemaType.Integer:
    case SchemaType.String: {
      return <JsonSchemaNodeRow {...rowProps} />
    }

    default:
      return null
  }
}

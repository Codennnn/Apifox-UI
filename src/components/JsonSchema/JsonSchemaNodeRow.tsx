import type { ReactNode } from 'react'

import { CaretRightOutlined } from '@ant-design/icons'
import { Input, Tooltip } from 'antd'
import { omit } from 'lodash'
import { CirclePlusIcon } from 'lucide-react'

import { cssSchemaType, DataTypeSelect } from '@/components/DataTypeSelect'
import { DoubleCheckRemoveBtn } from '@/components/DoubleCheckRemoveBtn'
import { useStyles } from '@/hooks/useStyle'

import { columnHeight, INDENT, KEY_ITEMS, KEY_PROPERTIES, SchemaType, SEPARATOR } from './constants'
import { useJsonSchemaContext } from './JsonSchema.context'
import type { ArraySchema, FieldPath, JsonSchema, RefSchema } from './JsonSchema.type'
import { getNodeLevelInfo } from './utils'

import { css } from '@emotion/css'

export interface JsonSchemaNodeRowProps {
  value?: JsonSchema
  onChange?: (value: JsonSchemaNodeRowProps['value']) => void

  fieldPath?: FieldPath[]
  onAddField?: (fieldPath: NonNullable<JsonSchemaNodeRowProps['fieldPath']>) => void
  onRemoveField?: (fieldPath: NonNullable<JsonSchemaNodeRowProps['fieldPath']>) => void
  /** 标记是否为引用模型 */
  fromRef?: RefSchema['$ref']
  /** 是否禁止编辑。 */
  disabled?: boolean
}

export function JsonSchemaNodeRow(props: JsonSchemaNodeRowProps) {
  const {
    value,
    onChange: triggerChange,
    fieldPath = [],
    onAddField,
    onRemoveField,
    fromRef,
    disabled = false,
  } = props

  const { styles } = useStyles(({ token }) => {
    return {
      tag: css(
        {
          padding: '0 5px',
          fontSize: '12px',
          borderRadius: '3px',
          cursor: 'default',
          userSelect: 'none',
          color: token.colorPrimary,
          backgroundColor: token.colorPrimaryBg,
        },
        { label: 'tag' }
      ),

      row: {
        main: css(
          {
            display: 'flex',

            '&:hover': {
              backgroundColor: token.colorFillQuaternary,

              [`.${cssSchemaType}`]: {
                display: 'inline-flex',
              },
            },
          },
          { label: 'row' }
        ),

        col: css(
          {
            height: columnHeight,
            display: 'flex',
            alignItems: 'center',
            margin: '0 3px',
            fontSize: '13px',
            cursor: disabled ? 'not-allowed' : 'default',
            borderBottom: `1px solid ${token.colorFillQuaternary}`,
            transition: 'border-color 0.2s',

            '.ant-input': {
              height: '100%',
              padding: '0',
              border: 'none',
              outline: 'none',
              fontSize: 'inherit',
              backgroundColor: 'transparent',

              '&.ant-input-disabled': {
                color: 'currentcolor',
              },

              '&:focus': {
                boxShadow: 'none',
              },
            },
          },
          { label: 'col' }
        ),

        colHover: css(
          {
            '&:hover, &:focus-within': {
              borderColor: disabled ? undefined : token.colorPrimary,
            },
          },
          { label: 'col-hover' }
        ),

        expandIcon: css(
          {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.3,
            cursor: 'pointer',
            fontSize: '12px',
            transform: 'scale(0.75)',

            '&:hover': {
              opacity: 0.8,
            },
          },
          { label: 'expand-icon' }
        ),

        expanded: css(
          {
            transform: 'scale(0.75) rotate(0.25turn)',
          },
          { label: 'expanded' }
        ),

        name: css(
          {
            flex: '1 1 263px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          },
          { label: 'name' }
        ),

        nameInner: css(
          {
            height: '100%',
            flex: '1',
            display: 'flex',
            alignItems: 'center',
          },
          { label: 'name-inner' }
        ),

        nameContent: css(
          {
            width: '100%',
            height: '100%',
          },
          { label: 'name-content' }
        ),

        type: css(
          {
            flex: '0 1 182px',
            width: '182px',
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',

            '&:hover': {
              borderColor: token.colorBorderSecondary,
            },
          },
          { label: 'name-type' }
        ),

        title: css(
          {
            flex: '1 0 36px',
            maxWith: '108px',
            display: 'flex',
            alignItems: 'center',
            color: 'inherit',
          },
          { label: 'title' }
        ),

        description: css(
          {
            flex: '1 0 54px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '4px',
            color: 'inherit',
          },
          { label: 'desc' }
        ),

        actions: css(
          {
            flex: '0 0 48px',
            display: 'flex',
            alignItems: 'center',
          },
          { label: 'actions' }
        ),

        action: css(
          {
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '12px',
            cursor: 'pointer',
            userSelect: 'none',
            padding: '2px 5px',
            borderRadius: '4px',

            '&:hover': {
              backgroundColor: token.colorFillAlter,
            },
          },
          { label: 'action' }
        ),

        actionAdd: css({
          color: token.colorSuccessActive,
        }),
      },

      typePopover: css({
        width: '345px',
      }),

      typeSelect: css({
        cursor: 'pointer',

        '&:hover': {
          textDecoration: 'underline',
        },
      }),
    }
  })

  const { readOnly, expandedKeys, onExpand, extraColumns } = useJsonSchemaContext()

  if (!value) {
    return null
  }

  const { type, name, displayName, description } = value

  const { indentWidth } = getNodeLevelInfo(fieldPath)

  const isRoot = fieldPath.length === 0
  const isItems = fieldPath.at(-1) === KEY_ITEMS
  const isCustom = !isRoot || !isItems

  const showExpandIcon =
    type === SchemaType.Object || type === SchemaType.Array || type === SchemaType.Refer

  const pathString = fieldPath.join(SEPARATOR)

  const shouldExpand = expandedKeys?.includes(pathString) || false
  const removable = !isRoot && !isItems

  return (
    <div className={styles.row.main}>
      <div className={`${styles.row.col} ${styles.row.name}`}>
        <span style={{ width: indentWidth + (fromRef ? INDENT : 0) }} />

        {showExpandIcon ? (
          <span
            className={`${styles.row.expandIcon} ${shouldExpand ? styles.row.expanded : ''}`}
            style={{ width: INDENT }}
            onClick={() => {
              const newExpandedKeys = shouldExpand
                ? expandedKeys?.filter((key) => key !== pathString)
                : [...(expandedKeys || []), pathString]

              // 当点击展开按钮时，会触发 onExpand 方法。
              onExpand?.(newExpandedKeys)
            }}
          >
            <CaretRightOutlined />
          </span>
        ) : (
          <span style={{ width: INDENT }} />
        )}

        <span
          className={`${styles.row.nameInner} ${styles.row.col} ${!isRoot && !isItems && isCustom ? styles.row.colHover : ''}`}
        >
          {isRoot || isItems ? (
            <span className={styles.tag}>{isItems ? 'ITEMS' : '根节点'}</span>
          ) : (
            <span className={styles.row.nameContent}>
              {readOnly ? (
                name
              ) : (
                <Input
                  disabled={disabled}
                  placeholder="字段名"
                  value={name}
                  onChange={(ev) => {
                    triggerChange?.({ ...value, name: ev.target.value })
                  }}
                />
              )}
            </span>
          )}
        </span>
      </div>

      <div className={`${styles.row.col} ${styles.row.type} ${styles.row.colHover}`}>
        <DataTypeSelect
          $ref={type === SchemaType.Refer ? value.$ref : undefined}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          onTypeSelect={(newType) => {
            const oldType = value.type
            let newValue = { ...value, type: newType } as JsonSchema

            if (oldType === newType) {
              return
            }

            switch (oldType) {
              case SchemaType.Object: {
                if (newType !== SchemaType.Object) {
                  triggerChange?.(omit(newValue, KEY_PROPERTIES) as JsonSchema)
                }
                break
              }

              case SchemaType.Array: {
                if (newType !== SchemaType.Array) {
                  triggerChange?.(omit(newValue, KEY_ITEMS) as JsonSchema)
                }
                break
              }

              default: {
                if (newType === SchemaType.Array) {
                  newValue = { ...newValue, items: { type: SchemaType.String } } as ArraySchema
                  onExpand?.(expandedKeys ? [...expandedKeys, pathString] : [pathString])
                }

                triggerChange?.(newValue)
              }
            }
          }}
        />
      </div>

      <div className={`${styles.row.col} ${styles.row.title} ${styles.row.colHover}`}>
        <Input
          disabled={disabled}
          placeholder="中文名"
          value={displayName}
          onChange={(ev) => {
            triggerChange?.({ ...value, displayName: ev.target.value })
          }}
        />
      </div>

      <div className={`${styles.row.col} ${styles.row.description} ${styles.row.colHover}`}>
        <Input
          disabled={disabled}
          placeholder="说明"
          value={description}
          onChange={(ev) => {
            triggerChange?.({ ...value, description: ev.target.value })
          }}
        />
      </div>

      {extraColumns?.map((column) => {
        return (
          <div
            key={column.key}
            className={`${styles.row.col} ${styles.row.colHover} ${column.colClassName ?? ''}`}
            style={column.colStyle}
          >
            {column.render?.(value[column.key as 'type'] as ReactNode, value, {
              disabled,
              fieldPath,
            })}
          </div>
        )
      })}

      <div className={`${styles.row.col} ${styles.row.actions}`}>
        {!isItems && (
          <Tooltip title={isRoot ? '添加子节点' : '添加相邻节点'}>
            <span
              className={`${styles.row.action} ${styles.row.actionAdd}`}
              onClick={() => {
                if (isRoot) {
                  onAddField?.([...fieldPath, KEY_PROPERTIES, '0'])
                } else {
                  onAddField?.(fieldPath)
                }
              }}
            >
              <CirclePlusIcon size={13} />
            </span>
          </Tooltip>
        )}

        {removable && (
          <DoubleCheckRemoveBtn
            className={styles.row.action}
            onRemove={() => {
              onRemoveField?.(fieldPath)
            }}
          />
        )}
      </div>
    </div>
  )
}

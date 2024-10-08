import { CloseCircleFilled } from '@ant-design/icons'
import { Input, Select, theme, Tooltip } from 'antd'
import { PlusCircleIcon, XCircleIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { DoubleCheckRemoveBtn } from '@/components/DoubleCheckRemoveBtn'
import { EditableTable, type EditableTableProps } from '@/components/EditableTable'
import { ParamsEditableCell } from '@/components/tab-content/api/components/ParamsEditableCell'
import { PARAMS_CONFIG } from '@/configs/static'
import { ParamType } from '@/enums'
import { useStyles } from '@/hooks/useStyle'
import type { Parameter } from '@/types'

import { css } from '@emotion/css'

const transformExampleValue = ({ type, example }: Pick<Parameter, 'type' | 'example'>) => {
  return type === ParamType.Array && !Array.isArray(example)
    ? [example || '']
    : Array.isArray(example)
      ? example.join(',')
      : example
}

interface ParamsEditableTableProps extends Pick<EditableTableProps, 'autoNewRow'> {
  value?: Parameter[]
  onChange?: (value: ParamsEditableTableProps['value']) => void
  removable?: boolean
  isPathParamsTable?: boolean
}

export function ParamsEditableTable(props: ParamsEditableTableProps) {
  const { token } = theme.useToken()

  const {
    value,
    onChange,
    isPathParamsTable = false,
    autoNewRow = !isPathParamsTable,
    removable = true,
  } = props

  const newRowRecordId = nanoid(6)

  const testIsNewRow = (target: Parameter | undefined) =>
    !target?.id || target.id === newRowRecordId

  const { styles } = useStyles(({ token }) => {
    const exampleRow = css({
      color: token.colorTextTertiary,

      '&:hover': {
        color: token.colorPrimary,
      },
    })

    return { exampleRow }
  })

  const handleDuplicate = (rowIdx: number, v: Partial<Parameter>) => {
    onChange?.(
      value
        ?.filter((_, i) => i !== rowIdx) // 首先排除当前行，避免重复。
        .map((it) => {
          if (it.name === v.name) {
            if (it.type === ParamType.Array) {
              return {
                ...it,
                example:
                  typeof v.example === 'string' ? [...(it.example || []), v.example] : it.example,
              }
            } else {
              return {
                ...it,
                type: ParamType.Array,
                example: [it.example || '', typeof v.example === 'string' ? v.example : ''],
              }
            }
          }

          return it
        })
    )
  }

  const handleChange = (rowIdx: number, v: Partial<Record<keyof Parameter, any>>) => {
    const target = value?.at(rowIdx)

    const isNewRow = testIsNewRow(target)

    if (isNewRow) {
      const isDuplicate = value?.some((it, i) => it.name === v.name && i < rowIdx)

      if (isDuplicate) {
        handleDuplicate(rowIdx, v)
      } else {
        onChange?.([
          ...(value || []),
          {
            id: newRowRecordId,
            ...target,
            ...v,
            type: ParamType.String,
          },
        ])
      }
    } else {
      onChange?.(
        value?.map((it, i) => {
          if (i === rowIdx) {
            return { ...it, ...v }
          }

          return it
        })
      )
    }
  }

  const columns: EditableTableProps<Parameter>['columns'] = [
    {
      title: '参数名',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, ridx) => {
        const isNewRow = testIsNewRow(record)

        const isNameEmpty = !text && !isNewRow

        const isDuplicate =
          value?.some((it, i) => {
            const isPrevRow = i < ridx
            const isSameName = it.name === text

            return isPrevRow && isSameName
          }) && !isNewRow

        const isValidateError = isNameEmpty || isDuplicate

        return (
          <ParamsEditableCell validateError={isValidateError}>
            <Tooltip
              open={isPathParamsTable ? undefined : false}
              title="自动提取接口路径里的 {param} 形式参数，请在接口路径中修改。"
            >
              <div className="flex size-full items-center">
                <Input
                  className="h-full"
                  placeholder="添加参数"
                  readOnly={isPathParamsTable}
                  value={typeof text === 'string' ? text : ''}
                  variant="borderless"
                  onBlur={() => {
                    if (isDuplicate) {
                      handleDuplicate(ridx, { name: text })
                    }
                  }}
                  onChange={(ev) => {
                    handleChange(ridx, { name: ev.target.value })
                  }}
                />
                {(isNameEmpty || isDuplicate) && (
                  <Tooltip
                    title={isNameEmpty ? '参数名不能为空' : isDuplicate ? '此列不能重复' : ''}
                  >
                    <span className="pr-1">
                      <CloseCircleFilled style={{ color: token.colorErrorText }} />
                    </span>
                  </Tooltip>
                )}
              </div>
            </Tooltip>
          </ParamsEditableCell>
        )
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 90,
      render: (text, record, ridx) => {
        const isNewRow = testIsNewRow(record)

        return (
          <ParamsEditableCell className={isNewRow ? 'opacity-0 hover:opacity-100' : ''}>
            <Select
              className="w-full [&.ant-select_.ant-select-selector]:text-inherit"
              options={[
                { label: 'string', value: ParamType.String },
                { label: 'integer', value: ParamType.Integer },
                { label: 'boolean', value: ParamType.Boolean },
                { label: 'number', value: ParamType.Number },
                { label: 'array', value: ParamType.Array, hidden: isPathParamsTable },
              ].filter((it) => !it.hidden)}
              popupClassName="min-w-[90px]"
              style={{
                color:
                  typeof text === 'string'
                    ? `var(${PARAMS_CONFIG[text as ParamType].varColor})`
                    : '',
              }}
              suffixIcon={null}
              value={typeof text === 'string' ? text : ''}
              variant="borderless"
              onChange={(paramType) => {
                handleChange(ridx, {
                  type: paramType,
                  example: transformExampleValue({
                    type: paramType as ParamType,
                    example: record.example,
                  }),
                })
              }}
            />
          </ParamsEditableCell>
        )
      },
    },
    {
      title: '示例值',
      dataIndex: 'example',
      width: '25%',
      render: (exampleVal, record, ridx) => {
        if (record.type === ParamType.Array) {
          const example: string[] =
            Array.isArray(exampleVal) && exampleVal.length > 0 ? exampleVal : ['']

          return (
            <div>
              {example.map((v, vIdx, self) => {
                const canRemove = self.length > 1

                return (
                  <div key={vIdx} className={`flex items-center ${styles.exampleRow}`}>
                    <ParamsEditableCell>
                      <Input
                        value={v}
                        variant="borderless"
                        onChange={(ev) => {
                          const newExample = self.toSpliced(vIdx, 1, ev.target.value)
                          handleChange(ridx, { example: newExample })
                        }}
                      />
                    </ParamsEditableCell>

                    <div className="flex items-center px-2">
                      <PlusCircleIcon
                        className="cursor-pointer"
                        size={15}
                        onClick={() => {
                          const newExample = example.toSpliced(vIdx + 1, 0, '')
                          handleChange(ridx, { example: newExample })
                        }}
                      />
                    </div>

                    <div
                      className={`flex items-center pr-2 ${canRemove ? '' : 'pointer-events-auto invisible opacity-0'}`}
                      onClick={() => {
                        if (canRemove) {
                          handleChange(ridx, { example: example.filter((_, i) => i !== vIdx) })
                        }
                      }}
                    >
                      <XCircleIcon className="cursor-pointer" size={15} />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }

        return (
          <ParamsEditableCell>
            <Input
              value={typeof exampleVal === 'string' ? exampleVal : undefined}
              variant="borderless"
              onChange={(ev) => {
                handleChange(ridx, { example: ev.target.value })
              }}
            />
          </ParamsEditableCell>
        )
      },
    },
    {
      title: '说明',
      dataIndex: 'description',
      width: '40%',
      render: (text, _, ridx) => {
        return (
          <ParamsEditableCell className="py-0">
            <Input.TextArea
              style={{
                height: '32px',
                minHeight: '100%',
                maxHeight: '100%',
                overflowY: 'hidden',
                resize: 'none',
              }}
              value={typeof text === 'string' ? text : undefined}
              variant="borderless"
              onChange={(ev) => {
                handleChange(ridx, { description: ev.target.value })
              }}
            />
          </ParamsEditableCell>
        )
      },
    },
    {
      width: 90,
      render: (_, record, idx) => {
        const isNewRow = testIsNewRow(record)

        if (!isNewRow && removable) {
          return (
            <div className="flex justify-center p-1 text-xs">
              <DoubleCheckRemoveBtn
                onRemove={() => {
                  onChange?.(value?.filter((_, i) => i !== idx))
                }}
              />
            </div>
          )
        }
      },
    },
  ]

  return (
    <EditableTable<Parameter>
      autoNewRow={autoNewRow}
      columns={columns}
      dataSource={value}
      newRowRecord={{
        id: newRowRecordId,
        type: ParamType.String,
      }}
    />
  )
}

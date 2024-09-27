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

  const { styles } = useStyles(({ token }) => {
    const exampleRow = css({
      color: token.colorTextTertiary,

      '&:hover': {
        color: token.colorPrimary,
      },
    })

    return { exampleRow }
  })

  const handleChange = (v: Partial<Record<keyof Parameter, any>>, idx: number) => {
    const target = value?.at(idx)

    if (target?.id && target.id !== newRowRecordId) {
      onChange?.(
        value?.map((it, i) => {
          if (i === idx) {
            return { ...it, ...v }
          }

          return it
        })
      )
    } else {
      onChange?.([
        ...(value || []),
        {
          id: '',
          ...target,
          ...v,
          type: ParamType.String,
        },
      ])
    }
  }

  const columns: EditableTableProps<Parameter>['columns'] = [
    {
      title: '参数名',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, idx) => {
        const isNewRow = !record.id || record.id === newRowRecordId

        return (
          <ParamsEditableCell>
            <Tooltip
              open={isPathParamsTable ? undefined : false}
              title="自动提取接口路径里的 {param} 形式参数，请在接口路径中修改。"
            >
              <div className="flex h-full items-center">
                <Input
                  className="h-full"
                  placeholder="添加参数"
                  readOnly={isPathParamsTable}
                  value={typeof text === 'string' ? text : ''}
                  variant="borderless"
                  onChange={(ev) => {
                    handleChange({ id: record.id, name: ev.target.value }, idx)
                  }}
                />
                {!text && !isNewRow && (
                  <Tooltip title="参数名不能为空">
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
      render: (text, record, idx) => {
        const isNewRow = !record.id || record.id === newRowRecordId

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
                handleChange(
                  {
                    type: paramType,
                    example:
                      paramType === ParamType.Array && !Array.isArray(record.example)
                        ? [record.example]
                        : record.example,
                  },
                  idx
                )
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
      render: (exampleVal, record, rowIdx) => {
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
                          handleChange({ example: newExample }, rowIdx)
                        }}
                      />
                    </ParamsEditableCell>

                    <div className="flex items-center px-2">
                      <PlusCircleIcon
                        className="cursor-pointer"
                        size={15}
                        onClick={() => {
                          handleChange({ example: [...example, ''] }, rowIdx)
                        }}
                      />
                    </div>

                    <div
                      className={`flex items-center pr-2 ${canRemove ? '' : 'pointer-events-auto invisible opacity-0'}`}
                      onClick={() => {
                        if (canRemove) {
                          handleChange({ example: example.filter((_, i) => i !== vIdx) }, rowIdx)
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
                handleChange({ example: ev.target.value }, rowIdx)
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
      render: (text, _, idx) => {
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
                handleChange({ description: ev.target.value }, idx)
              }}
            />
          </ParamsEditableCell>
        )
      },
    },
    {
      width: 90,
      render: (_, record, idx) => {
        const isNewRow = !record.id || record.id === newRowRecordId

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

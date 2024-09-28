import { theme } from 'antd'

import { ParamsEditableCell } from '@/components/tab-content/api/components/ParamsEditableCell'
import { isFirefox } from '@/helpers'
import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface ColumnType<RecordType> {
  title?: string
  dataIndex?: string
  width?: number | string
  render?: (text: any, record: RecordType, index: number) => React.ReactNode
}

export interface EditableTableProps<RecordType = any> {
  rowKey?: string
  columns?: ColumnType<RecordType>[]
  dataSource?: RecordType[]
  /** 是否自动展示新增行。 */
  autoNewRow?: boolean
  newRowRecord?: Partial<RecordType>
}

export function EditableTable<RecordType = any>(props: EditableTableProps<RecordType>) {
  const { token } = theme.useToken()

  const { rowKey = 'id', columns, dataSource = [], autoNewRow, newRowRecord } = props

  const { styles } = useStyles(({ token }) => {
    const th = css({
      color: token.colorTextTertiary,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    })

    const td = css({
      height: isFirefox() ? '100%' : '0', // HACK: 处理 td 高度，让子 div 的高度能占满 td。
      color: token.colorTextSecondary,
      textAlign: 'left',
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      overflow: 'hidden',
      boxSizing: 'border-box',

      '.ant-input': {
        minHeight: '32px',
        padding: '0 5px',
      },

      'textarea.ant-input': {
        padding: '5px',
      },
    })

    const editableWrapper = css({
      '&:hover, &:focus-within': {
        outline: `1px solid ${token.colorPrimary}`,
        borderColor: 'transparent',
      },
    })

    return { th, td, editableWrapper }
  })

  const internalDataSource = autoNewRow ? [...dataSource, { ...newRowRecord }] : dataSource

  return (
    <table
      className="w-full border-spacing-0"
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
      }}
    >
      <colgroup>
        {columns?.map((col, idx) => {
          return <col key={col.dataIndex || `${idx}`} width={col.width} />
        })}
      </colgroup>

      <thead>
        <tr>
          {columns?.map((col, idx) => {
            return (
              <th
                key={col.dataIndex || `${idx}`}
                className={`p-1 text-left font-normal ${styles.th}`}
                scope="col"
              >
                {col.title}
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody>
        {internalDataSource.map((record, ridx) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          <tr key={`${ridx}_${String(record[rowKey])}`} className="h-fit">
            {columns?.map((col, cidx) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              const tdValue = col.dataIndex ? record[col.dataIndex] : null

              return (
                <td
                  key={`${cidx}_${String(col.dataIndex)}`}
                  className={styles.td}
                  style={{ border: internalDataSource.length === ridx + 1 ? 'none' : undefined }}
                >
                  {typeof col.render === 'function' ? (
                    col.render(tdValue, record as RecordType, ridx)
                  ) : (
                    <ParamsEditableCell>{String(tdValue)}</ParamsEditableCell>
                  )}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

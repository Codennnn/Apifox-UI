import { theme } from 'antd'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface ColumnType<RecordType> {
  title?: string
  dataIndex?: string
  width?: number | string
  render?: (text: any, record: RecordType, index: number) => React.ReactNode
}

export interface EditableTableProps<RecordType = any> {
  columns?: ColumnType<RecordType>[]
  dataSource?: RecordType[]
  /** 是否自动展示新增行。 */
  autoNewRow?: boolean
  newRowRecord?: Partial<RecordType>
}

export function EditableTable<RecordType = any>(props: EditableTableProps<RecordType>) {
  const { token } = theme.useToken()

  const { columns, dataSource = [], autoNewRow, newRowRecord } = props

  const { styles } = useStyles(({ token }) => {
    const th = css({
      color: token.colorTextTertiary,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    })

    const td = css({
      color: token.colorTextSecondary,
      textAlign: 'left',
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      overflow: 'hidden',

      '&:not(:last-of-type)': {
        '&:hover, &:focus-within': {
          outline: `1px solid ${token.colorPrimary}`,
          borderColor: 'transparent',
        },
      },

      '.ant-input': {
        height: '32px',
        padding: '0 5px',
      },

      'textarea.ant-input': {
        padding: '5px',
      },
    })

    return { th, td }
  })

  const internalDataSource = autoNewRow ? [...dataSource, { ...newRowRecord }] : dataSource

  return (
    <table
      className="w-full"
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
          <tr key={`${ridx}`}>
            {columns?.map((col, cidx) => {
              return (
                <td
                  key={`${cidx}`}
                  className={styles.td}
                  style={{ border: internalDataSource.length === ridx + 1 ? 'none' : undefined }}
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  {col.render?.(col.dataIndex ? record[col.dataIndex] : null, record, ridx)}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

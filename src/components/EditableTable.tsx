import { theme } from 'antd'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface ColumnType<T> {
  title?: string
  dataIndex?: string
  width?: number | string
  render?: (text: any, record: T, index: number) => React.ReactNode
}

interface EditableTableProps<T = any> {
  columns?: ColumnType<T>[]
  dataSource?: any[]
}

export function EditableTable(props: EditableTableProps) {
  const { token } = theme.useToken()

  const { columns, dataSource = [{}] } = props

  const { styles } = useStyles(({ token }) => {
    const th = css({
      color: token.colorTextSecondary,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    })

    const td = css({
      color: token.colorTextSecondary,
      textAlign: 'left',
      borderBottom: `1px solid ${token.colorBorderSecondary}`,

      '&:hover, &:focus-within': {
        outline: `1px solid ${token.colorPrimary}`,
        borderColor: 'transparent',
      },
    })

    return { th, td }
  })

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
          return <col key={`${idx}`} width={col.width} />
        })}
      </colgroup>

      <thead>
        <tr>
          {columns?.map((col, idx) => {
            return (
              <th key={`${idx}`} className={`p-1 text-left font-normal ${styles.th}`} scope="col">
                {col.title}
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody>
        {dataSource.map((record, ridx) => (
          <tr key={`${ridx}`}>
            {columns?.map((col, cidx) => {
              return (
                <td
                  key={`${cidx}`}
                  className={styles.td}
                  style={{ border: dataSource.length === ridx + 1 ? 'none' : void 0 }}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  {col.dataIndex ? col.render?.(record[col.dataIndex], record, ridx) : null}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

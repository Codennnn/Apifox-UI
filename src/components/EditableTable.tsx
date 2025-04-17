import { cloneElement } from 'react'

import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { theme } from 'antd'

import { ParamsEditableCell } from '@/components/tab-content/api/components/ParamsEditableCell'
import { isFirefox } from '@/helpers'
import { useStyles } from '@/hooks/useStyle'
import type { AnyType } from '@/types'

import { css } from '@emotion/css'

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

const DraggableTabNode = (props: DraggableTabPaneProps) => {
  const { isDragging, attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 99 : undefined,
  }

  return cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

interface ColumnType<RecordType> {
  title?: string
  dataIndex?: string
  width?: number | string
  render?: (text: AnyType, record: RecordType, index: number) => React.ReactNode
}

export interface EditableTableProps<RecordType = AnyType> {
  rowKey?: string
  columns?: ColumnType<RecordType>[]
  dataSource?: RecordType[]
  /** 是否自动展示新增行。 */
  autoNewRow?: boolean
  newRowRecord?: Partial<RecordType>
}

export function EditableTable<RecordType = AnyType>(props: EditableTableProps<RecordType>) {
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

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

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
          return <col key={col.dataIndex ?? `${idx}`} width={col.width} />
        })}
      </colgroup>

      <thead>
        <tr>
          {columns?.map((col, idx) => {
            return (
              <th
                key={col.dataIndex ?? `${idx}`}
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
        <DndContext sensors={[sensor]}>
          <SortableContext
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            items={internalDataSource.map((r, ridx) => `${ridx}_${String(r[rowKey])}`)}
          >
            {internalDataSource.map((record, ridx) => (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              <DraggableTabNode key={`${ridx}_${String(record[rowKey])}`} className="h-fit">
                <tr className="h-fit">
                  {columns?.map((col, cidx) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const tdValue = col.dataIndex ? record[col.dataIndex] : null

                    return (
                      <td
                        key={`${cidx}_${String(col.dataIndex)}`}
                        className={styles.td}
                        style={{
                          border: internalDataSource.length === ridx + 1 ? 'none' : undefined,
                        }}
                      >
                        {typeof col.render === 'function'
                          ? (
                              col.render(tdValue, record as RecordType, ridx)
                            )
                          : (
                              <ParamsEditableCell>{String(tdValue)}</ParamsEditableCell>
                            )}
                      </td>
                    )
                  })}
                </tr>
              </DraggableTabNode>
            ))}
          </SortableContext>
        </DndContext>
      </tbody>
    </table>
  )
}

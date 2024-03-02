import { Button, Popconfirm, Table, Tooltip } from 'antd'

import { FileIcon } from '@/components/icons/FileIcon'
import { HttpMethodText } from '@/components/icons/HttpMethodText'
import { useGlobalContext } from '@/contexts/global'
import { MenuItemType } from '@/enums'
import type { RecycleData } from '@/types'

export function Recycle() {
  const { recyleRawList, restoreMenuItem } = useGlobalContext()

  return (
    <div className="p-tabContent">
      <Table<RecycleData>
        columns={[
          {
            title: '文件名称',
            dataIndex: 'deletedItem',
            render: (x: RecycleData['deletedItem']) => {
              const isHttp =
                x.type === MenuItemType.ApiDetail || x.type === MenuItemType.HttpRequest

              return (
                <div className="inline-flex items-center gap-x-1">
                  {isHttp ? (
                    <HttpMethodText className="text-xs font-bold" method={x.data?.method} />
                  ) : (
                    <FileIcon size={15} type={x.type} />
                  )}
                  <span>{x.name}</span>
                </div>
              )
            },
          },
          {
            title: '操作人',
            dataIndex: 'creator',
            render: (x: RecycleData['creator']) => {
              return <Tooltip title={x.username}>{x.name}</Tooltip>
            },
          },
          { title: '剩余时间', dataIndex: 'expiredAt' },
          {
            title: '操作',
            render: (_, record) => {
              return (
                <Popconfirm
                  placement="left"
                  title="确定恢复该文件？"
                  onConfirm={() => {
                    restoreMenuItem({ id: record.deletedItem.id })
                  }}
                >
                  <Button size="small" type="link">
                    恢复
                  </Button>
                </Popconfirm>
              )
            },
          },
        ]}
        dataSource={recyleRawList}
        rowKey="id"
        rowSelection={{}}
      />
    </div>
  )
}

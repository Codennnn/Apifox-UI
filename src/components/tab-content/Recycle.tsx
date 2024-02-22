import { Button, Table } from 'antd'

import { useGlobalContext } from '@/contexts/global'
import type { RecycleData } from '@/types'

export function Recycle() {
  const { recyleRawList, addMenuItem } = useGlobalContext()

  return (
    <div className="p-tabContent">
      <Table<RecycleData>
        columns={[
          {
            title: '文件名称',
            dataIndex: 'deletedItem',
            render: (x: RecycleData['deletedItem']) => {
              return x.name
            },
          },
          {
            title: '操作人',
            dataIndex: 'creator',
            render: (x: RecycleData['creator']) => {
              return x.name
            },
          },
          { title: '剩余时间', dataIndex: 'expiredAt' },
          {
            title: '操作',
            render: (_, record) => {
              return (
                <>
                  <Button
                    size="small"
                    type="link"
                    onClick={() => {
                      addMenuItem(record.deletedItem)
                    }}
                  >
                    恢复
                  </Button>
                </>
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

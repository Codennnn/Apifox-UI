import { useMemo } from 'react'

import { Table } from 'antd'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { HttpMethodText } from '@/components/icons/HttpMethodText'
import { useGlobalContext } from '@/contexts/global'
import { MenuItemType } from '@/enums'
import type { ApiDetails } from '@/types'
import { findGroup } from '@/utils'

interface DataSource extends ApiDetails {
  groupPath?: string
}

export function FolderApiList() {
  const { menuRawList } = useGlobalContext()
  const { tabData } = useTabContentContext()

  const dataSource = useMemo(() => {
    return menuRawList
      ?.filter((it) => it.parentId === tabData.key && it.type === MenuItemType.ApiDetail)
      .map((item) => {
        const groupPath = findGroup(menuRawList, [], item.parentId)
          .map((it) => it.name)
          .join(' / ')

        return { ...(item.data as ApiDetails), groupPath }
      })
  }, [menuRawList, tabData])

  return (
    <div>
      <Table<DataSource>
        columns={[
          { title: '接口名称', dataIndex: 'name' },
          {
            title: '请求类型',
            dataIndex: 'method',
            render: (method) => (
              <HttpMethodText className="text-xs font-semibold" method={method} />
            ),
          },
          { title: '接口路径', dataIndex: 'path' },
          { title: '接口分组', dataIndex: 'groupPath' },
        ]}
        dataSource={dataSource}
        rowKey="id"
        rowSelection={{}}
      />
    </div>
  )
}

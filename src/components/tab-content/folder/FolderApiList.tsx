import { useMemo } from 'react'

import { Table } from 'antd'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { HttpMethodText } from '@/components/icons/HttpMethodText'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { MenuItemType } from '@/enums'
import { findChildrenById, findFolders } from '@/helpers'
import type { ApiDetails } from '@/types'

interface DataSource extends ApiDetails {
  groupPath?: string
}

export function FolderApiList() {
  const { menuRawList } = useMenuHelpersContext()
  const { tabData } = useTabContentContext()

  const dataSource = useMemo(() => {
    if (menuRawList) {
      return findChildrenById(menuRawList, tabData.key)
        .filter((it) => it.type === MenuItemType.ApiDetail)
        .map((item) => {
          const groupPath =
            item.parentId &&
            findFolders(menuRawList, [], item.parentId)
              .map((it) => it.name)
              .join(' / ')

          if (item.data) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            return { ...(item.data as ApiDetails), groupPath }
          }

          throw Error()
        })
    }
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

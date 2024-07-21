import { Button, ConfigProvider, Popconfirm, Table, Tabs, theme, Tooltip } from 'antd'

import { FileIcon } from '@/components/icons/FileIcon'
import { HttpMethodText } from '@/components/icons/HttpMethodText'
import { API_MENU_CONFIG } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { CatalogType, MenuItemType } from '@/enums'
import { hasAccentColor } from '@/helpers'
import type { RecycleCatalogType, RecycleDataItem } from '@/types'

interface RecycleTableProps {
  catalogType: RecycleCatalogType
}

function RecycleTable(props: RecycleTableProps) {
  const { token } = theme.useToken()

  const { catalogType } = props

  const { recyleRawData, restoreMenuItem } = useMenuHelpersContext()

  return (
    <Table<RecycleDataItem>
      className="overflow-hidden [&_.ant-table-row:last-of-type_>_.ant-table-cell]:border-none [&_.ant-table-thead_>_tr_>_.ant-table-cell]:font-normal"
      columns={[
        {
          title: '文件名称',
          dataIndex: 'deletedItem',
          render: (x: RecycleDataItem['deletedItem']) => {
            const isHttp = x.type === MenuItemType.ApiDetail || x.type === MenuItemType.HttpRequest
            const { accentColor } = API_MENU_CONFIG[catalogType]

            return (
              <div className="inline-flex items-center gap-x-1">
                {isHttp ? (
                  <HttpMethodText className="text-xs font-bold" method={x.data?.method} />
                ) : (
                  <FileIcon
                    size={15}
                    style={{ color: hasAccentColor(x.type) ? accentColor : undefined }}
                    type={x.type}
                  />
                )}
                <span>{x.name}</span>
              </div>
            )
          },
        },
        {
          title: '操作人',
          dataIndex: 'creator',
          width: 150,
          render: (x: RecycleDataItem['creator']) => {
            return <Tooltip title={x.username}>{x.name}</Tooltip>
          },
        },

        { title: '剩余时间', dataIndex: 'expiredAt', width: 150 },
        {
          title: '操作',
          width: 100,
          render: (_, record) => {
            return (
              <Popconfirm
                placement="left"
                title="确定恢复该文件？"
                onConfirm={() => {
                  restoreMenuItem({ restoreId: record.id, catalogType })
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
      dataSource={recyleRawData?.[catalogType].list}
      pagination={false}
      rowKey="id"
      rowSelection={{}}
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
      }}
    />
  )
}

export function Recycle() {
  const { token } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerColor: token.colorTextSecondary,
            headerBg: token.colorBgContainer,
          },
        },
      }}
    >
      <Tabs
        hideAdd
        className={`[&_>_.ant-tabs-nav]:px-tabContent`}
        hidden={false}
        items={[
          {
            key: CatalogType.Http,
            label: '接口',
            children: (
              <div className="p-tabContent">
                <RecycleTable catalogType={CatalogType.Http} />
              </div>
            ),
          },
          {
            key: CatalogType.Schema,
            label: '数据模型',
            children: (
              <div className="p-tabContent">
                <RecycleTable catalogType={CatalogType.Schema} />
              </div>
            ),
          },
          {
            key: CatalogType.Request,
            label: '快捷请求',
            children: (
              <div className="p-tabContent">
                <RecycleTable catalogType={CatalogType.Request} />
              </div>
            ),
          },
        ]}
      />
    </ConfigProvider>
  )
}

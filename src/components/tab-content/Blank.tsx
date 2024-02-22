import { Button, Col, Dropdown, Row, theme } from 'antd'
import { ChevronDownIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { FileIcon } from '@/components/icons/FileIcon'
import { apiMenuConfig } from '@/configs/static'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { CatalogType, MenuItemType } from '@/enums'

interface NewItemProps {
  catalogType: CatalogType
  menuItemType: MenuItemType
  label: string
}

function NewItem(props: NewItemProps) {
  const { token } = theme.useToken()

  const { catalogType, menuItemType, label } = props

  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()

  return (
    <div
      className="cursor-pointer"
      style={{
        backgroundColor: token.colorFillTertiary,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
      }}
      onClick={() => {
        const { newLabel } = apiMenuConfig[catalogType]

        addTabItem(
          {
            key: nanoid(4),
            label: newLabel,
            contentType: menuItemType,
            data: {
              tabStatus: PageTabStatus.Create,
            },
          },
          {
            replaceTab: tabData.key,
          }
        )
      }}
    >
      <div className="flex items-center justify-center px-5 py-20">
        <div style={{ color: token.colorPrimary }}>
          <FileIcon size={35} type={catalogType} />
        </div>
      </div>
      <div
        className="px-2 py-4 text-center"
        style={{
          backgroundColor: token.colorFillSecondary,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function Blank() {
  const { token } = theme.useToken()

  return (
    <div className="flex h-full flex-col items-center justify-center py-8">
      <Row wrap className="mb-9 w-[800px]" gutter={[16, 16]} justify="center">
        <Col lg={6}>
          <NewItem
            catalogType={CatalogType.Http}
            label="新建接口"
            menuItemType={MenuItemType.ApiDetail}
          />
        </Col>
        <Col lg={6}>
          <NewItem
            catalogType={CatalogType.Request}
            label="快捷请求"
            menuItemType={MenuItemType.HttpRequest}
          />
        </Col>
        <Col lg={6}>
          <NewItem
            catalogType={CatalogType.Markdown}
            label="新建 Markdown"
            menuItemType={MenuItemType.Doc}
          />
        </Col>
        <Col lg={6}>
          <NewItem
            catalogType={CatalogType.Schema}
            label="新建数据模型"
            menuItemType={MenuItemType.ApiSchema}
          />
        </Col>
      </Row>

      <Dropdown
        menu={{
          items: [
            {
              label: (
                <a href="https://www.antgroup.com" rel="noopener noreferrer" target="_blank">
                  1st menu item
                </a>
              ),
              key: '0',
            },
          ],
        }}
        placement="bottom"
      >
        <Button
          style={{ color: token.colorTextTertiary }}
          type="link"
          onClick={(ev) => {
            ev.preventDefault()
          }}
        >
          <span className="!inline-flex items-center gap-1">
            <span>更多功能</span>
            <ChevronDownIcon size={14} />
          </span>
        </Button>
      </Dropdown>
    </div>
  )
}

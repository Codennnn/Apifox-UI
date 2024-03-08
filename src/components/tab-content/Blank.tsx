import { show } from '@ebay/nice-modal-react'
import { Button, Col, Dropdown, Row, theme } from 'antd'
import { ChevronDownIcon, FolderPlusIcon } from 'lucide-react'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { FileIcon } from '@/components/icons/FileIcon'
import { ModalNewCatalog } from '@/components/modals/ModalNewCatalog'
import { API_MENU_CONFIG } from '@/configs/static'
import { CatalogType, MenuItemType } from '@/enums'
import { useHelpers } from '@/hooks/useHelpers'

interface NewItemProps {
  catalogType: CatalogType
  label: string
  onClick?: () => void
}

function NewItem(props: NewItemProps) {
  const { token } = theme.useToken()

  const { catalogType, label, onClick } = props

  const { accentColor } = API_MENU_CONFIG[catalogType]

  return (
    <div
      className="cursor-pointer"
      style={{
        backgroundColor: token.colorFillQuaternary,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
      }}
      onClick={() => {
        onClick?.()
      }}
    >
      <div className="flex items-center justify-center px-5 py-16">
        <div style={{ color: token.colorPrimary }}>
          <FileIcon size={35} style={{ color: accentColor }} type={catalogType} />
        </div>
      </div>
      <div
        className="px-2 py-4 text-center"
        style={{
          backgroundColor: token.colorFillQuaternary,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function Blank() {
  const { token } = theme.useToken()

  const { createApiDetails, createApiRequest, createDoc, createApiSchema } = useHelpers()
  const { tabData } = useTabContentContext()

  return (
    <div className="flex h-full flex-col items-center justify-center py-8">
      <Row wrap className="mb-6 w-[750px]" gutter={[16, 16]} justify="center">
        <Col lg={6} md={12}>
          <NewItem
            catalogType={CatalogType.Http}
            label="新建接口"
            onClick={() => {
              createApiDetails({}, { replaceTab: tabData.key })
            }}
          />
        </Col>
        <Col lg={6} md={12}>
          <NewItem
            catalogType={CatalogType.Request}
            label="快捷请求"
            onClick={() => {
              createApiRequest({}, { replaceTab: tabData.key })
            }}
          />
        </Col>
        <Col lg={6} md={12}>
          <NewItem
            catalogType={CatalogType.Markdown}
            label="新建 Markdown"
            onClick={() => {
              createDoc({}, { replaceTab: tabData.key })
            }}
          />
        </Col>
        <Col lg={6} md={12}>
          <NewItem
            catalogType={CatalogType.Schema}
            label="新建数据模型"
            onClick={() => {
              createApiSchema({}, { replaceTab: tabData.key })
            }}
          />
        </Col>
      </Row>

      <Dropdown
        menu={{
          items: [
            {
              key: '0',
              label: '新建接口目录',
              icon: <FolderPlusIcon size={18} />,
              onClick: () => {
                void show(ModalNewCatalog, { formData: { type: MenuItemType.ApiDetailFolder } })
              },
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

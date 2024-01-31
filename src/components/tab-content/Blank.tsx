import { Button, Col, Dropdown, Row, theme } from 'antd'
import { ChevronDownIcon } from 'lucide-react'

import { FileIcon } from '@/components/icons/FileIcon'
import { CatalogType } from '@/enums'

interface NewItemProps {
  type: CatalogType
  label: string
}

function NewItem(props: NewItemProps) {
  const { token } = theme.useToken()

  const { type, label } = props

  return (
    <div
      className="cursor-pointer"
      style={{
        backgroundColor: token.colorFillTertiary,
        border: `1px solid ${token.colorBorder}`,
        borderRadius: token.borderRadiusLG,
      }}
    >
      <div className="flex items-center justify-center px-5 py-20">
        <div style={{ color: token.colorPrimary }}>
          <FileIcon size={35} type={type} />
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
          <NewItem label="新建接口" type={CatalogType.Http} />
        </Col>
        <Col lg={6}>
          <NewItem label="快捷请求" type={CatalogType.Request} />
        </Col>
        <Col lg={6}>
          <NewItem label="新建 Markdown" type={CatalogType.Markdown} />
        </Col>
        <Col lg={6}>
          <NewItem label="新建数据模型" type={CatalogType.Schema} />
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

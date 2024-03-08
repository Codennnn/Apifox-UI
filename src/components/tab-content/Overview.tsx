import { Col, Row, Skeleton, theme } from 'antd'

export function Overview() {
  const { token } = theme.useToken()

  return (
    <Row className="w-full overflow-hidden p-tabContent" gutter={[token.padding, token.padding]}>
      <Col span={24}>
        <div
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
            padding: token.padding,
          }}
        >
          <div className="mb-4 text-lg">项目统计</div>
          <div className="flex flex-wrap">
            <div className="w-1/5">
              <div className="text-2xl">10</div>
              <div className="mt-1 text-xs" style={{ color: token.colorTextTertiary }}>
                接口数
              </div>
            </div>
            <div className="w-1/5">
              <div className="text-2xl">12</div>
              <div className="mt-1 text-xs" style={{ color: token.colorTextTertiary }}>
                接口用例数
              </div>
            </div>
            <div className="w-1/5">
              <div className="text-2xl">1</div>
              <div className="mt-1 text-xs" style={{ color: token.colorTextTertiary }}>
                文档数
              </div>
            </div>
            <div className="w-1/5">
              <div className="text-2xl">4</div>
              <div className="mt-1 text-xs" style={{ color: token.colorTextTertiary }}>
                数据模型数
              </div>
            </div>
            <div className="w-1/5">
              <div className="text-2xl">1</div>
              <div className="mt-1 text-xs" style={{ color: token.colorTextTertiary }}>
                测试场景数
              </div>
            </div>
          </div>
        </div>
      </Col>

      <Col span={16}>
        <div
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
            padding: token.padding,
          }}
        >
          <Skeleton />
        </div>
      </Col>

      <Col span={8}>
        <div
          style={{
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadius,
            padding: token.padding,
          }}
        >
          <Skeleton />
        </div>
      </Col>
    </Row>
  )
}

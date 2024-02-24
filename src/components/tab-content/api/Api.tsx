import { useMemo, useState } from 'react'

import { Button, ConfigProvider, Space, Tabs, type TabsProps, theme, Tooltip } from 'antd'
import { PanelRightIcon } from 'lucide-react'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'

import { ApiDoc } from './ApiDoc'
import { ApiDocEditing } from './ApiDocEditing'
import { ContentWrapper } from './ContentWrapper'

export function Api() {
  const { token } = theme.useToken()

  const { tabData } = useTabContentContext()

  const [panelOpen, setPanelOpen] = useState(false)

  const apiTabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'doc',
        label: '文档',
        children: (
          <ContentWrapper className="p-tabContent">
            <ApiDoc />
          </ContentWrapper>
        ),
      },
      {
        key: 'docEdit',
        label: '修改文档',
        children: (
          <ContentWrapper>
            <ApiDocEditing />
          </ContentWrapper>
        ),
      },
    ]
  }, [])

  return (
    <div className="h-full overflow-hidden">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              labelColor: token.colorTextSecondary,
              verticalLabelPadding: 0,
            },
          },
        }}
      >
        {tabData.data?.tabStatus === PageTabStatus.Create ? (
          <ContentWrapper>
            <ApiDocEditing />
          </ContentWrapper>
        ) : (
          <div className="flex h-full overflow-hidden">
            <Tabs
              animated={false}
              className="api-details-tabs"
              defaultActiveKey="docEdit"
              items={apiTabItems}
              tabBarExtraContent={
                <>
                  <Tooltip placement="topLeft" title="历史记录、SEO 设置">
                    <Button
                      size="small"
                      style={{
                        backgroundColor: panelOpen ? token.colorFillSecondary : void 0,
                      }}
                      type="text"
                      onClick={() => {
                        setPanelOpen(!panelOpen)
                      }}
                    >
                      <IconText icon={<PanelRightIcon size={18} />} />
                    </Button>
                  </Tooltip>
                </>
              }
            />

            <div
              className={`h-full overflow-hidden ${panelOpen ? 'flex' : 'hidden'}`}
              style={{
                borderLeft: `1px solid ${token.colorBorderSecondary}`,
              }}
            >
              <div style={{ width: 320 }}>
                <div
                  className="flex h-[50px] items-center px-4 py-2"
                  style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
                >
                  <span className="text-base font-medium">历史记录</span>
                </div>
              </div>

              <div
                className="h-full p-1"
                style={{ borderLeft: `1px solid ${token.colorBorderSecondary}` }}
              >
                <Space direction="vertical"></Space>
              </div>
            </div>
          </div>
        )}
      </ConfigProvider>
    </div>
  )
}

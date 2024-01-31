import { useMemo } from 'react'

import { Button, ConfigProvider, Tabs, type TabsProps, theme, Tooltip } from 'antd'
import { HistoryIcon } from 'lucide-react'

import { IconText } from '@/components/IconText'

import { ApiDoc } from './ApiDoc'
import { ApiDocEditing } from './ApiDocEditing'
import { ContentWrapper } from './ContentWrapper'

export function Api() {
  const { token } = theme.useToken()

  const apiTabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'doc',
        label: '文档',
        children: (
          <ContentWrapper>
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
      {
        key: 'run',
        label: '运行',
      },
      {
        key: 'mock',
        label: '高级 Mock',
      },
    ]
  }, [])

  return (
    <div className="h-full overflow-hidden">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              colorPrimary: token.colorPrimary,
            },
          },
        }}
      >
        <Tabs
          animated={false}
          className="api-details-tabs"
          defaultActiveKey="doc"
          items={apiTabItems}
          tabBarExtraContent={
            <>
              <Tooltip placement="topLeft" title="修改历史">
                <Button size="small" type="text">
                  <IconText icon={<HistoryIcon size={18} />} />
                </Button>
              </Tooltip>
            </>
          }
        />
      </ConfigProvider>
    </div>
  )
}

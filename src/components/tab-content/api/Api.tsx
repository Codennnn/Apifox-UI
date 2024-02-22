import { useMemo } from 'react'

import { Button, ConfigProvider, Tabs, type TabsProps, theme, Tooltip } from 'antd'
import { HistoryIcon } from 'lucide-react'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'

import { ApiDoc } from './ApiDoc'
import { ApiDocEditing } from './ApiDocEditing'
import { ContentWrapper } from './ContentWrapper'

export function Api() {
  const { token } = theme.useToken()

  const { tabData } = useTabContentContext()

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
          <Tabs
            animated={false}
            className="api-details-tabs"
            defaultActiveKey="docEdit"
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
        )}
      </ConfigProvider>
    </div>
  )
}

import { Tabs } from 'antd'

import { ContentWrapper } from '@/components/tab-content/api/ContentWrapper'

import { FolderApiList } from './FolderApiList'
import { FolderSetting } from './FolderSetting'

export function Folder() {
  return (
    <div>
      <Tabs
        animated={false}
        className="[&_>_.ant-tabs-nav]:!mx-4"
        items={[
          {
            key: 'settings',
            label: '目录设置',
            children: (
              <ContentWrapper className="p-tabContent">
                <FolderSetting />
              </ContentWrapper>
            ),
          },
          {
            key: 'apis',
            label: '全部接口',
            children: (
              <ContentWrapper className="p-tabContent">
                <FolderApiList />
              </ContentWrapper>
            ),
          },
        ]}
      />
    </div>
  )
}

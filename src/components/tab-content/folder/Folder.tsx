import { Tabs } from 'antd'

import { ApiTabContentWrapper } from '@/components/ApiTab/ApiTabContentWrapper'

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
              <ApiTabContentWrapper className="p-tabContent">
                <FolderSetting />
              </ApiTabContentWrapper>
            ),
          },
          {
            key: 'apis',
            label: '全部接口',
            children: (
              <ApiTabContentWrapper className="p-tabContent">
                <FolderApiList />
              </ApiTabContentWrapper>
            ),
          },
        ]}
      />
    </div>
  )
}

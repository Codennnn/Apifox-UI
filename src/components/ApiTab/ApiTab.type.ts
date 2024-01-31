import type { TabsProps } from 'antd'

import type { TabContentType } from '@/types'

import type { PageTabStatus } from './ApiTab.enum'

export type EditStatus = 'changed' | 'saved'

export type Tab = NonNullable<TabsProps['items']>[0]

export interface ApiTabItem extends Pick<Tab, 'key' | 'label'> {
  /** 页签内容类型。 */
  contentType: TabContentType
  /** 页签附加数据。 */
  data?: Record<string, unknown> & {
    editStatus?: EditStatus
    tabStatus?: PageTabStatus
  }
}

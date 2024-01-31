import { Button, Dropdown } from 'antd'
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { IconText } from '@/components/IconText'
import { apiMenuConfig } from '@/configs/static'

import { useMenuTabHelpers } from '../../contexts/menu-tab-settings'
import { CatalogType } from '../../enums'

import type { ApiTabItem } from './ApiTab.type'

export function ApiTabAction() {
  const { addTabItem, removeAllTabItems, removeOtherTabItems } = useMenuTabHelpers()

  const createNewTab = ({
    tabItemData,
  }: {
    tabItemData: Partial<ApiTabItem> & { contentType: ApiTabItem['contentType'] }
  }) => {
    let label: ApiTabItem['label']

    switch (tabItemData.contentType) {
      case CatalogType.Http:
      case CatalogType.Schema: {
        label = apiMenuConfig[tabItemData.contentType].newLabel
        break
      }

      case 'blank':
        label = '新建...'
        break
    }

    const key = nanoid(4)

    addTabItem({
      key,
      label,
      ...tabItemData,
      data: { ...tabItemData.data },
    })
  }

  return (
    <div className="ml-2 flex gap-x-1">
      <Button
        size="small"
        type="text"
        onClick={() => {
          createNewTab({ tabItemData: { contentType: 'blank' } })
        }}
      >
        <IconText icon={<PlusIcon size={16} />} />
      </Button>

      <Dropdown
        menu={{
          items: [
            {
              key: 'closeAll',
              label: '关闭所有标签页',
              onClick: () => {
                removeAllTabItems()
              },
            },
            {
              key: 'closeOthers',
              label: '关闭其他标签页',
              onClick: () => {
                removeOtherTabItems()
              },
            },
          ],
        }}
      >
        <Button size="small" type="text">
          <IconText icon={<MoreHorizontalIcon size={16} />} />
        </Button>
      </Dropdown>
    </div>
  )
}

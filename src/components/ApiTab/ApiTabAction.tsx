import { Button, Dropdown } from 'antd'
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { IconText } from '@/components/IconText'

import { useMenuTabHelpers } from '../../contexts/menu-tab-settings'

export function ApiTabAction() {
  const { addTabItem, removeAllTabItems, removeOtherTabItems } = useMenuTabHelpers()

  return (
    <div className="ml-2 mt-2 flex gap-x-1">
      <Button
        size="small"
        type="text"
        onClick={() => {
          addTabItem({
            key: nanoid(),
            label: '新建...',
            contentType: 'blank',
          })
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

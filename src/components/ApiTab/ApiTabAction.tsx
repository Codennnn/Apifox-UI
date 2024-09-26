import { useMemo } from 'react'

import { Button, Dropdown, type MenuProps } from 'antd'
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { IconText } from '@/components/IconText'

import { useMenuTabHelpers } from '../../contexts/menu-tab-settings'

export function useApiTabActions() {
  const { removeAllTabItems, removeOtherTabItems } = useMenuTabHelpers()

  const menuItems = useMemo<MenuProps['items']>(
    () => [
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
    [removeAllTabItems, removeOtherTabItems]
  )

  return {
    menuItems,
  }
}

export function ApiTabAction() {
  const { addTabItem } = useMenuTabHelpers()

  const { menuItems } = useApiTabActions()

  return (
    <div className="ml-2 flex gap-x-1">
      <Button
        size="small"
        type="text"
        onClick={() => {
          addTabItem({
            key: nanoid(6),
            label: '新建...',
            contentType: 'blank',
          })
        }}
      >
        <IconText icon={<PlusIcon size={16} />} />
      </Button>

      <Dropdown
        menu={{
          items: menuItems,
        }}
      >
        <Button size="small" type="text">
          <IconText icon={<MoreHorizontalIcon size={16} />} />
        </Button>
      </Dropdown>
    </div>
  )
}

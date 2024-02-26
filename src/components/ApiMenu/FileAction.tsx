import { MoreHorizontalIcon } from 'lucide-react'

import { DropdownActions } from '@/components/ApiMenu/DropdownActions'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

/**
 * 菜单项的文件操作。
 */
export function FileAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  return (
    <DropdownActions catalog={catalog}>
      <MenuActionButton
        icon={<MoreHorizontalIcon size={14} />}
        onClick={(ev) => {
          ev.stopPropagation()
        }}
      />
    </DropdownActions>
  )
}

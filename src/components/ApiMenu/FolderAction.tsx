import { Tooltip } from 'antd'
import { MoreHorizontalIcon, PlusIcon } from 'lucide-react'

import { DropdownActions } from '@/components/ApiMenu/DropdownActions'
import { API_MENU_CONFIG } from '@/configs/static'
import { getCatalogType, getCreateType } from '@/helpers'
import { useHelpers } from '@/hooks/useHelpers'

import type { ApiMenuData } from './ApiMenu.type'
import { MenuActionButton } from './MenuActionButton'

/**
 * 菜单项的文件夹操作。
 */
export function FolderAction(props: { catalog: ApiMenuData }) {
  const { catalog } = props

  const catalogType = getCatalogType(catalog.type)
  const { tipTitle } = API_MENU_CONFIG[catalogType]

  const { createTabItem } = useHelpers()

  return (
    <>
      <Tooltip title={tipTitle}>
        <MenuActionButton
          icon={<PlusIcon size={14} />}
          onClick={(ev) => {
            ev.stopPropagation()
            createTabItem(getCreateType(catalog.type))
          }}
        />
      </Tooltip>

      <DropdownActions isFolder catalog={catalog}>
        <MenuActionButton
          icon={<MoreHorizontalIcon size={14} />}
          onClick={(ev) => {
            ev.stopPropagation()
          }}
        />
      </DropdownActions>
    </>
  )
}

import { theme } from 'antd'

import { AppMenuControls } from '@/components/ApiMenu/AppMenuControls'
import { DropdownActions } from '@/components/ApiMenu/DropdownActions'
import { isMenuFolder } from '@/helpers'

import type { CatalogDataNode } from './ApiMenu.type'

/** 计算叶子节点的数量，用于显示在菜单名称后面。 */
const countLeaf = (node: CatalogDataNode) => {
  let count = 0

  node.children?.forEach((child) => {
    if (child.isLeaf) {
      count += 1
    } else {
      count += countLeaf(child as CatalogDataNode)
    }
  })

  return count
}

interface ApiMenuTitleProps {
  node: CatalogDataNode
  name: string
  actions?: React.ReactNode
}

/**
 * 普通菜单项标题。
 */
export function ApiMenuTitle(props: ApiMenuTitleProps) {
  const { token } = theme.useToken()

  const { node, name, actions } = props

  const catalog = node.customData.catalog
  const isFolder = isMenuFolder(catalog.type)

  const count = isFolder ? countLeaf(node) : null

  return (
    <DropdownActions catalog={catalog} isFolder={isFolder} trigger={['contextMenu']}>
      <span className="flex w-full items-center truncate">
        <span className="flex items-center truncate pr-1">
          <span className="truncate">{name}</span>

          {isFolder && count! > 0 && (
            <span className="ml-1 text-xs" style={{ color: token.colorTextTertiary }}>
              ({count})
            </span>
          )}
        </span>

        <AppMenuControls>{actions}</AppMenuControls>
      </span>
    </DropdownActions>
  )
}

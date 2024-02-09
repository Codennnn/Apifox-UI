import { theme } from 'antd'

import { AppMenuControls } from '@/components/ApiMenu/AppMenuControls'
import { isMenuFolder } from '@/utils'

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

  const isFolder = isMenuFolder(node.customData.catalog.type)

  const count = isFolder ? countLeaf(node) : null

  return (
    <span className="flex items-center overflow-hidden">
      <span className="flex flex-1 items-center truncate">
        {name}

        {isFolder && count! > 0 && (
          <span className="ml-1 text-xs" style={{ color: token.colorTextTertiary }}>
            ({count})
          </span>
        )}
      </span>

      <AppMenuControls>{actions}</AppMenuControls>
    </span>
  )
}

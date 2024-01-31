import { LayoutIcon, type LucideProps, TrashIcon, UnplugIcon } from 'lucide-react'

import { CatalogType } from '@/enums'
import type { TabContentType } from '@/types'

import { FileIcon } from './FileIcon'

interface FolderIconProps extends Pick<LucideProps, 'size'> {
  type: TabContentType
}

/**
 * 菜单目录文件夹的图标。
 */
export function FolderIcon(props: FolderIconProps) {
  const { type, size = 16 } = props

  switch (type) {
    case CatalogType.Overview:
      return <LayoutIcon size={size} />

    case CatalogType.Schema:
    case CatalogType.Request:
      return <FileIcon size={size} type={type} />

    case CatalogType.Http:
      return <UnplugIcon size={size} />

    case CatalogType.Recycle:
      return <TrashIcon size={size} />

    default:
      return null
  }
}

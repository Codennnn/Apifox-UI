import { LayoutIcon, TrashIcon, UnplugIcon } from 'lucide-react'

import { CatalogType } from '@/enums'

import { FileIcon, type FileIconProps } from './FileIcon'

type FolderIconProps = FileIconProps

/**
 * 菜单目录文件夹的图标。
 */
export function FolderIcon(props: FolderIconProps) {
  const { type, size = 16, className } = props

  const iconProps = { size, className }

  switch (type) {
    case CatalogType.Overview:
      return <LayoutIcon {...iconProps} />

    case CatalogType.Schema:
    case CatalogType.Request:
      return <FileIcon {...iconProps} type={type} />

    case CatalogType.Http:
      return <UnplugIcon {...iconProps} />

    case CatalogType.Recycle:
      return <TrashIcon {...iconProps} />

    default:
      return null
  }
}

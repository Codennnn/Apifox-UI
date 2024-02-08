import {
  FileDownIcon,
  FileText,
  FolderOpenIcon,
  type LucideProps,
  PackageIcon,
  UnplugIcon,
  ZapIcon,
} from 'lucide-react'

import { CatalogType, MenuItemType } from '@/enums'
import type { TabContentType } from '@/types'

interface FileIconProps extends Pick<LucideProps, 'size'> {
  type: TabContentType
}

/**
 * 菜单目录文件夹下的文件图标。
 */
export function FileIcon(props: FileIconProps) {
  const { type, size } = props

  switch (type) {
    case CatalogType.Http:
      return <UnplugIcon size={size} />

    case CatalogType.Schema:
    case MenuItemType.ApiSchema:
      return <PackageIcon size={size} />

    case CatalogType.Request:
      return <ZapIcon size={size} />

    case CatalogType.Markdown:
      return <FileDownIcon size={size} />

    case MenuItemType.Doc:
      return <FileText size={size} />

    case MenuItemType.ApiDetailFolder:
    case MenuItemType.ApiSchemaFolder:
      return <FolderOpenIcon size={size} />

    default:
      return null
  }
}

import {
  FileDownIcon,
  FileText,
  FolderClosedIcon,
  type LucideProps,
  PackageIcon,
  UnplugIcon,
  ZapIcon,
} from 'lucide-react'

import { CatalogType, MenuItemType } from '@/enums'
import type { TabContentType } from '@/types'

export interface FileIconProps extends Pick<LucideProps, 'size' | 'className' | 'style'> {
  type: TabContentType
}

/**
 * 菜单目录文件夹下的文件图标。
 */
export function FileIcon(props: FileIconProps) {
  const { type, size, className } = props

  const iconProps = { size, className }

  switch (type) {
    case CatalogType.Http:
      return <UnplugIcon {...iconProps} />

    case CatalogType.Schema:
    case MenuItemType.ApiSchema:
      return <PackageIcon {...iconProps} />

    case CatalogType.Request:
      return <ZapIcon {...iconProps} />

    case CatalogType.Markdown:
      return <FileDownIcon {...iconProps} />

    case MenuItemType.Doc:
      return <FileText {...iconProps} />

    case MenuItemType.ApiDetailFolder:
    case MenuItemType.ApiSchemaFolder:
      return <FolderClosedIcon {...iconProps} />

    default:
      return null
  }
}

import {
  FileMinusIcon,
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
  const { type, size, className, style } = props

  const iconProps: Pick<FileIconProps, 'size' | 'className' | 'style'> = {
    size,
    className,
    style,
  }

  switch (type) {
    case CatalogType.Http:
    case MenuItemType.ApiDetail:
      return <UnplugIcon {...iconProps} />

    case CatalogType.Schema:
    case MenuItemType.ApiSchema:
      return <PackageIcon {...iconProps} />

    case CatalogType.Request:
    case MenuItemType.HttpRequest:
      return <ZapIcon {...iconProps} />

    case CatalogType.Markdown:
    case MenuItemType.Doc:
      return <FileMinusIcon {...iconProps} />

    case MenuItemType.ApiDetailFolder:
    case MenuItemType.ApiSchemaFolder:
      return <FolderClosedIcon {...iconProps} />

    default:
      return null
  }
}

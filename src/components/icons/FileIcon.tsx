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

  if (type === CatalogType.Http || type === MenuItemType.ApiDetail) {
    return <UnplugIcon {...iconProps} />
  }
  else if (type === CatalogType.Schema || type === MenuItemType.ApiSchema) {
    return <PackageIcon {...iconProps} />
  }
  else if (type === CatalogType.Request || type === MenuItemType.HttpRequest) {
    return <ZapIcon {...iconProps} />
  }
  else if (type === CatalogType.Markdown || type === MenuItemType.Doc) {
    return <FileMinusIcon {...iconProps} />
  }
  else if (type === MenuItemType.ApiDetailFolder || type === MenuItemType.ApiSchemaFolder) {
    return <FolderClosedIcon {...iconProps} />
  }
  else {
    return null
  }
}

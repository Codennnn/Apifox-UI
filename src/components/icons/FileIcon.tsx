import {
  FileDownIcon,
  FolderOpenIcon,
  type LucideProps,
  PackageIcon,
  UnplugIcon,
  ZapIcon,
} from 'lucide-react'

import { CatalogType, MenuType } from '@/enums'
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
      return <PackageIcon size={size} />

    case CatalogType.Request:
      return <ZapIcon size={size} />

    case CatalogType.Markdown:
      return <FileDownIcon size={size} />

    case MenuType.Folder:
      return <FolderOpenIcon size={size} />

    default:
      return null
  }
}

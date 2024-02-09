import type { TreeProps } from 'antd'

import type { JsonSchema } from '@/components/JsonSchema'
import type { MenuItemType } from '@/enums'
import type { ApiDetails } from '@/types'

interface ApiMenuBase {
  id: CatalogId
  parentId?: CatalogId
  name: string
  type: MenuItemType
}

interface ApiMenuInterface extends ApiMenuBase {
  type: MenuItemType.ApiDetail | MenuItemType.ApiDetailFolder
  data?: ApiDetails
}

interface ApiMenuDoc extends ApiMenuBase {
  type: MenuItemType.Doc
  data?: ApiDetails
}

interface ApiMenuSchema extends ApiMenuBase {
  type: MenuItemType.ApiSchema | MenuItemType.ApiSchemaFolder
  data?: {
    jsonSchema: JsonSchema
  }
}

interface ApiMenuRequest extends ApiMenuBase {
  type: MenuItemType.HttpRequest | MenuItemType.RequestFolder
  data?: ApiDetails
}

export type CatalogId = string

export type ApiMenuData = ApiMenuInterface | ApiMenuSchema | ApiMenuDoc | ApiMenuRequest

export type TreeDataNode = NonNullable<TreeProps['treeData']>[0]

export type CatalogDataNode = Omit<TreeDataNode, 'key'> & {
  key: string
  customData: {
    catalog: ApiMenuData
  }
  children?: CatalogDataNode[]
}

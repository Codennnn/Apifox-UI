import type { TreeProps } from 'antd'

import type { JsonSchema } from '@/components/JsonSchema'
import type { CatalogType, MenuItemType, MenuType } from '@/enums'
import type { ApiDetails } from '@/types'

interface ApiMenuBase {
  id: CatalogId
  parentId?: CatalogId
  name: string
  catalogType: CatalogType
  menuType: MenuType
  type: MenuItemType
}

interface ApiMenuInterface extends ApiMenuBase {
  catalogType: CatalogType.Http
  type: MenuItemType.ApiDetail | MenuItemType.ApiDetailFolder
  data?: ApiDetails
}

interface ApiMenuDoc extends ApiMenuBase {
  catalogType: CatalogType.Http
  type: MenuItemType.Doc
  data?: ApiDetails
}

interface ApiMenuSchema extends ApiMenuBase {
  catalogType: CatalogType.Schema
  type: MenuItemType.ApiSchema | MenuItemType.ApiSchemaFolder
  data?: {
    jsonSchema: JsonSchema
  }
}

export type CatalogId = string

export type ApiMenuData = ApiMenuInterface | ApiMenuSchema | ApiMenuDoc

type TreeDataNode = NonNullable<TreeProps['treeData']>[0]

export type CatalogDataNode = Omit<TreeDataNode, 'key'> & {
  key: string
  customData: {
    catalog: ApiMenuData
  }
  children?: CatalogDataNode[]
}

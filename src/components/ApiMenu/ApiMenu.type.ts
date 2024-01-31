import type { TreeProps } from 'antd'

import type { JsonSchema } from '@/components/JsonSchema'
import type { CatalogType, MenuType } from '@/enums'
import type { ApiDetails } from '@/types'

export const enum MenuItemType {
  ApiDetail = 'apiDetail',
  ApiDetailFolder = 'apiDetailFolder',
  ApiSchema = 'apiSchema',
  ApiSchemaFolder = 'apiSchemaFolder',
  HttpResponse = 'httpResponse',
  HttpRequest = 'httpRequest',
  Doc = 'doc',
}

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
  data?: ApiDetails
}

interface ApiMenuSchema extends ApiMenuBase {
  catalogType: CatalogType.Schema
  data?: {
    jsonSchema: JsonSchema
  }
}

export type CatalogId = string

export type ApiMenuData = ApiMenuInterface | ApiMenuSchema

type TreeDataNode = NonNullable<TreeProps['treeData']>[0]

export type CatalogDataNode = Omit<TreeDataNode, 'key'> & {
  key: string
  customData: {
    catalog: ApiMenuData
  }
  children?: CatalogDataNode[]
}

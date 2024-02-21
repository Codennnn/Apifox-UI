import type { TreeProps } from 'antd'

import type { JsonSchema } from '@/components/JsonSchema'
import type { MenuItemType } from '@/enums'
import type { ApiDetails, ApiDoc, ApiFolder } from '@/types'

export interface ApiMenuBase {
  id: CatalogId
  parentId?: ApiMenuBase['id']
  name: string
  type: MenuItemType
}

interface ApiMenuInterface extends ApiMenuBase {
  type: MenuItemType.ApiDetail
  data?: ApiDetails
}

interface ApiMenuInterfaceFolder extends ApiMenuBase {
  type: MenuItemType.ApiDetailFolder
  data?: ApiFolder
}

interface ApiMenuDoc extends ApiMenuBase {
  type: MenuItemType.Doc
  data?: ApiDoc
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

export type ApiMenuData =
  | ApiMenuInterface
  | ApiMenuSchema
  | ApiMenuDoc
  | ApiMenuRequest
  | ApiMenuInterfaceFolder

export type TreeDataNode = NonNullable<TreeProps['treeData']>[0]

export type CatalogDataNode = Omit<TreeDataNode, 'key'> & {
  key: string
  customData: {
    catalog: ApiMenuData
  }
  children?: CatalogDataNode[]
}

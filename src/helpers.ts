import type { ApiMenuData } from '@/components/ApiMenu'
import { CatalogType, ContentType, MenuItemType } from '@/enums'

export function getCatalogType(type: MenuItemType): CatalogType {
  switch (type) {
    case MenuItemType.ApiDetail:
    case MenuItemType.ApiDetailFolder:
    case MenuItemType.Doc:
      return CatalogType.Http

    case MenuItemType.ApiSchema:
    case MenuItemType.ApiSchemaFolder:
      return CatalogType.Schema

    default:
      return CatalogType.Request
  }
}

export function getCreateType(
  type: MenuItemType | CatalogType
): MenuItemType.ApiDetail | MenuItemType.ApiSchema | MenuItemType.Doc | MenuItemType.HttpRequest {
  switch (type) {
    case MenuItemType.ApiDetail:
    case MenuItemType.ApiDetailFolder:
    case CatalogType.Http:
      return MenuItemType.ApiDetail

    case MenuItemType.Doc:
      return MenuItemType.Doc

    case MenuItemType.ApiSchema:
    case MenuItemType.ApiSchemaFolder:
    case CatalogType.Schema:
      return MenuItemType.ApiSchema

    case MenuItemType.HttpRequest:
    case MenuItemType.RequestFolder:
    case CatalogType.Request:
      return MenuItemType.HttpRequest

    default:
      throw new Error(`未处理的类型：${type}`)
  }
}

/** 判断是否为菜单文件夹类型。 */
export function isMenuFolder(type: MenuItemType): boolean {
  return (
    type === MenuItemType.ApiDetailFolder ||
    type === MenuItemType.ApiSchemaFolder ||
    type === MenuItemType.RequestFolder
  )
}

/** 判断给定的类型是否属于可创建菜单类型。 */
export function isCreateType(
  type: any
): type is
  | MenuItemType.ApiDetail
  | MenuItemType.ApiSchema
  | MenuItemType.Doc
  | MenuItemType.HttpRequest {
  return (
    type === MenuItemType.ApiDetail ||
    type === MenuItemType.ApiSchema ||
    type === MenuItemType.HttpRequest ||
    type === MenuItemType.Doc
  )
}

/** 判断给定的类型是否属于顶部菜单类型。 */
export function isTopMenuType(
  type: any
): type is CatalogType.Overview | CatalogType.Http | CatalogType.Schema | CatalogType.Recycle {
  return (
    type === CatalogType.Overview ||
    type === CatalogType.Http ||
    type === CatalogType.Schema ||
    type === CatalogType.Recycle
  )
}

/** 判断两个菜单是否在同一分组。 */
export function isMenuSameGroup(left: ApiMenuData, right: ApiMenuData): boolean {
  switch (left.type) {
    case MenuItemType.ApiDetailFolder:
    case MenuItemType.ApiDetail:
    case MenuItemType.Doc:
      return (
        right.type === MenuItemType.ApiDetailFolder ||
        right.type === MenuItemType.ApiDetail ||
        right.type === MenuItemType.Doc
      )

    case MenuItemType.ApiSchemaFolder:
    case MenuItemType.ApiSchema:
      return right.type === MenuItemType.ApiSchemaFolder || right.type === MenuItemType.ApiSchema

    case MenuItemType.RequestFolder:
    case MenuItemType.HttpRequest:
      return right.type === MenuItemType.RequestFolder || right.type === MenuItemType.HttpRequest

    default:
      return false
  }
}

/** 递归寻找目标菜单的父级文件夹。 */
export function findFolders(
  menuRawList: ApiMenuData[],
  folderMenus: ApiMenuData[],
  parentId: string
): ApiMenuData[] {
  const res = menuRawList.find((it) => it.id === parentId)

  if (res) {
    folderMenus.unshift(res)

    if (res.parentId) {
      return findFolders(menuRawList, folderMenus, res.parentId)
    }
  }

  return folderMenus
}

/** 递归寻找目标菜单 ID 下所有与之相关联的子菜单。 */
export function findChildrenById(arr: ApiMenuData[], id: ApiMenuData['id']): ApiMenuData[] {
  const result: ApiMenuData[] = []

  const findChildren = (id: ApiMenuData['id']) => {
    for (const item of arr) {
      if (item.parentId === id) {
        result.push(item)
        findChildren(item.id)
      }
    }
  }

  findChildren(id)

  return result
}

export function hasAccentColor(type: any): boolean {
  return (
    type === MenuItemType.ApiDetail ||
    type === MenuItemType.ApiSchema ||
    type === MenuItemType.HttpRequest
  )
}

export function getContentTypeString(type: ContentType): string {
  switch (type) {
    case ContentType.JSON:
      return 'application/json'

    case ContentType.XML:
      return 'application/xml'

    case ContentType.HTML:
      return 'text/html'

    case ContentType.Raw:
      return 'text/plain'

    case ContentType.Binary:
      return 'application/octet-stream'

    default:
      return 'text/plain'
  }
}

export function isFirefox() {
  return navigator.userAgent.includes('Firefox')
}

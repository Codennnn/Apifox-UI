import type { ApiMenuData } from '@/components/ApiMenu'
import { CatalogType, ContentType, MenuItemType } from '@/enums'
import { UnsafeAny } from '@/types'

export function getCatalogType(type: MenuItemType): CatalogType {
  if (
    type === MenuItemType.ApiDetail
    || type === MenuItemType.ApiDetailFolder
    || type === MenuItemType.Doc
  ) {
    return CatalogType.Http
  }
  else if (type === MenuItemType.ApiSchema || type === MenuItemType.ApiSchemaFolder) {
    return CatalogType.Schema
  }
  else {
    return CatalogType.Request
  }
}

export function getCreateType(
  type: MenuItemType | CatalogType,
): MenuItemType.ApiDetail | MenuItemType.ApiSchema | MenuItemType.Doc | MenuItemType.HttpRequest {
  if (
    type === MenuItemType.ApiDetail
    || type === MenuItemType.ApiDetailFolder
    || type === CatalogType.Http
  ) {
    return MenuItemType.ApiDetail
  }
  else if (type === MenuItemType.Doc) {
    return MenuItemType.Doc
  }
  else if (
    type === MenuItemType.ApiSchema
    || type === MenuItemType.ApiSchemaFolder
    || type === CatalogType.Schema
  ) {
    return MenuItemType.ApiSchema
  }
  else if (
    type === MenuItemType.HttpRequest
    || type === MenuItemType.RequestFolder
    || type === CatalogType.Request
  ) {
    return MenuItemType.HttpRequest
  }
  else {
    throw new Error(`未处理的类型：${type}`)
  }
}

/** 判断是否为菜单文件夹类型。 */
export function isMenuFolder(type: MenuItemType): boolean {
  return (
    type === MenuItemType.ApiDetailFolder
    || type === MenuItemType.ApiSchemaFolder
    || type === MenuItemType.RequestFolder
  )
}

/** 判断给定的类型是否属于可创建菜单类型。 */
export function isCreateType(
  type: UnsafeAny,
): type is
| MenuItemType.ApiDetail
| MenuItemType.ApiSchema
| MenuItemType.Doc
| MenuItemType.HttpRequest {
  return (
    type === MenuItemType.ApiDetail
    || type === MenuItemType.ApiSchema
    || type === MenuItemType.HttpRequest
    || type === MenuItemType.Doc
  )
}

/** 判断给定的类型是否属于顶部菜单类型。 */
export function isTopMenuType(
  type: UnsafeAny,
): type is CatalogType.Overview | CatalogType.Http | CatalogType.Schema | CatalogType.Recycle {
  return (
    type === CatalogType.Overview
    || type === CatalogType.Http
    || type === CatalogType.Schema
    || type === CatalogType.Recycle
  )
}

/** 判断两个菜单是否在同一分组。 */
export function isMenuSameGroup(left: ApiMenuData, right: ApiMenuData): boolean {
  const httpGroup = [
    MenuItemType.ApiDetailFolder,
    MenuItemType.ApiDetail,
    MenuItemType.Doc,
  ]

  const schemaGroup = [
    MenuItemType.ApiSchemaFolder,
    MenuItemType.ApiSchema,
  ]

  const requestGroup = [
    MenuItemType.RequestFolder,
    MenuItemType.HttpRequest,
  ]

  if (httpGroup.includes(left.type)) {
    return httpGroup.includes(right.type)
  }

  if (schemaGroup.includes(left.type)) {
    return schemaGroup.includes(right.type)
  }

  if (requestGroup.includes(left.type)) {
    return requestGroup.includes(right.type)
  }

  return false
}

/** 递归寻找目标菜单的父级文件夹。 */
export function findFolders(
  menuRawList: ApiMenuData[],
  folderMenus: ApiMenuData[],
  parentId: string,
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

export function hasAccentColor(type: UnsafeAny): boolean {
  return (
    type === MenuItemType.ApiDetail
    || type === MenuItemType.ApiSchema
    || type === MenuItemType.HttpRequest
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

import type { ApiMenuData } from '@/components/ApiMenu'
import { CatalogType, MenuItemType } from '@/enums'

export function getPageTitle(title?: string): string {
  const mainTitle = 'Apifox 复刻版用户界面'

  return title ? `${title} - ${mainTitle}` : mainTitle
}

/** 将 JS 序列化为 JSON 的超集，包括正则表达式，日期和函数。 */
export { default as serialize } from 'serialize-javascript'

/** 反序列化，对应 serialize 方法。 */
export function deserialize<ReturnType = unknown>(data: any): ReturnType {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return Function('"use strict";return (' + data + ')')() as ReturnType
}

/** 检查传入的值是否为简单的 JS 对象。 */
export function isPureObject(value: any): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

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

/** 判断是否为菜单文件夹类型。 */
export function isMenuFolder(type: MenuItemType): boolean {
  return (
    type === MenuItemType.ApiDetailFolder ||
    type === MenuItemType.ApiSchemaFolder ||
    type === MenuItemType.RequestFolder
  )
}

export const findGroup = (
  menuRawList: ApiMenuData[],
  names: ApiMenuData[],
  parentId?: string
): ApiMenuData[] => {
  const res = menuRawList.find((it) => it.id === parentId)

  if (res) {
    names.unshift(res)

    if (res.parentId) {
      return findGroup(menuRawList, names, res.parentId)
    }
  }

  return names
}

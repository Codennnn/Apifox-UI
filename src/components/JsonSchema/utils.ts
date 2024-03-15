import type { ApiMenuData } from '@/components/ApiMenu'
import { MenuItemType } from '@/enums'

import { INDENT, KEY_ITEMS, KEY_PROPERTIES, SchemaType, SEPARATOR } from './constants'
import type { FieldPath, JsonSchema } from './JsonSchema.type'

/**
 * 递归解析 JsonSchema，将所有可展开的节点的字段路径作为 key，最后合并到一个数组中并返回。
 *
 * @example
 *
 * { properties: [{}, { properties: [{}] }, { items: {} }] }
 * =>
 * ['properties.0', 'properties.1.properties.0', 'properties.2.items']
 */
export function getAllExpandedKeys(
  jsonSchema: JsonSchema,
  path: FieldPath[] = [],
  keys: string[] = []
): string[] {
  if (jsonSchema.type === SchemaType.Object) {
    if (keys.length === 0) {
      keys.push('') // <-- 根节点
    }

    jsonSchema.properties?.forEach((js, i) => {
      const newPath = [...path, KEY_PROPERTIES, `${i}`]
      keys.push(newPath.join(SEPARATOR))
      getAllExpandedKeys(js, newPath, keys)
    })
  } else if (jsonSchema.type === SchemaType.Array) {
    const newPath = [...path, KEY_ITEMS]
    keys.push(newPath.join(SEPARATOR))
    getAllExpandedKeys(jsonSchema.items, newPath, keys)
  }

  return keys
}

/**
 * 根据 Schema 中字段的路径，获取到该字段的层级。
 */
export function getNodeLevelInfo(fieldPath: FieldPath[]): { level: number; indentWidth: number } {
  const level = fieldPath.filter(
    (pathName) => pathName === KEY_PROPERTIES || pathName === KEY_ITEMS
  ).length

  const indentWidth = level * INDENT

  return { level, indentWidth }
}

export function getRefJsonSchema(
  menuRawList: ApiMenuData[],
  modelId: string
): JsonSchema | undefined {
  const menuData = menuRawList.find(({ id }) => id === modelId)

  const jsonSchema =
    menuData?.type === MenuItemType.ApiSchema ? menuData.data?.jsonSchema : undefined

  return jsonSchema
}

import { INDENT, items_key, properties_key, SchemaType, SEPARATOR } from './constants'
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
      const newPath = [...path, properties_key, `${i}`]
      keys.push(newPath.join(SEPARATOR))
      getAllExpandedKeys(js, newPath, keys)
    })
  } else if (jsonSchema.type === SchemaType.Array) {
    const newPath = [...path, items_key]
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
    (pathName) => pathName === properties_key || pathName === items_key
  ).length

  const indentWidth = level * INDENT

  return { level, indentWidth }
}

export function getRefDataModel(modelId: string): JsonSchema | undefined {
  const json1: JsonSchema = {
    type: SchemaType.Object,
    properties: [
      {
        name: 'ref1',
        type: SchemaType.Integer,
        displayName: 'aa',
        description: 'aaa',
      },
      // {
      //   name: 'B',
      //   type: SchemaType.Object,
      //   properties: [
      //     {
      //       name: 'B1',
      //       type: SchemaType.String,
      //     },
      //   ],
      //   displayName: 'bb',
      //   description: 'bbb',
      // },
      // {
      //   name: 'C',
      //   type: SchemaType.Array,
      //   items: {
      //     type: SchemaType.Object,
      //     properties: [
      //       {
      //         name: 'C1',
      //         type: SchemaType.String,
      //       },
      //     ],
      //   },
      //   displayName: 'cc',
      // },
      {
        name: 'D',
        type: SchemaType.Refer,
        $ref: 'json2',
        displayName: 'cc',
      },
    ],
    displayName: '对象',
    description: '说明',
  }

  const json2: JsonSchema = {
    type: SchemaType.Object,
    properties: [
      {
        name: 'ref2',
        type: SchemaType.Integer,
        displayName: 'aa',
        description: 'aaa',
      },
    ],
    displayName: '对象',
    description: '说明',
  }

  if (modelId === 'json1') {
    return json1
  }

  if (modelId === 'json2') {
    return json2
  }
}

import type { JsonSchema } from './JsonSchema.type'

export const KEY_PROPERTIES = 'properties'
export const KEY_ITEMS = 'items'

/** 字段名路径分隔符。 */
export const SEPARATOR = '.'

/** 树结构的层级缩进数值。 */
export const INDENT = 16

export const columnHeight = 32

export const enum SchemaType {
  Null = 'null',
  Integer = 'integer',
  Number = 'number',
  String = 'string',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
  Any = 'any',
  Refer = 'ref',
}

export const defaultSchemaTypeConfig = {
  [SchemaType.Null]: {
    text: 'null',
    varColor: '--color-orange-6',
  },
  [SchemaType.Integer]: {
    text: 'integer',
    varColor: '--color-pink-6',
  },
  [SchemaType.Number]: {
    text: 'number',
    varColor: '--color-orange-6',
  },
  [SchemaType.String]: {
    text: 'string',
    varColor: '--color-green-6',
  },
  [SchemaType.Boolean]: {
    text: 'boolean',
    varColor: '--color-pink-6',
  },
  [SchemaType.Array]: {
    text: 'array',
    varColor: '--color-green-6',
  },
  [SchemaType.Object]: {
    text: 'object',
    varColor: '--color-blue-6',
  },
  [SchemaType.Any]: {
    text: 'any',
    varColor: '--color-blue-6',
  },
  [SchemaType.Refer]: {
    text: '引用模型',
    varColor: '--color-purple-6',
  },
} as const satisfies Record<SchemaType, { text: string; label?: string; varColor: string }>

export const defaultFieldData: JsonSchema = {
  name: '',
  type: SchemaType.String,
}

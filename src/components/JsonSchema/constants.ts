import type { JsonSchema } from './JsonSchema.type'

export const properties_key = 'properties'
export const items_key = 'items'

/** 字段名路径分隔符。 */
export const SEPARATOR = '.'

/** 树结构的层级缩进数值。 */
export const INDENT = 16

export const columnHeight = 32

export const enum SchemaType {
  Void = 'void',
  Integer = 'integer',
  Double = 'double',
  String = 'string',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
  Refer = 'ref',
}

export const enum Color {
  Primary = '#3b82f6',
  Warning = '#f59e0b',
  Success = '#10b981',
  Error = '#ef4444',
  Border = '#efefef',
  RowBackground = '#efefef44',
}

export const defaultSchemaTypeConfig = {
  [SchemaType.Void]: {
    text: 'void',
    varColor: '--color-orange-6',
  },
  [SchemaType.Integer]: {
    text: 'integer',
    varColor: '--color-pink-6',
  },
  [SchemaType.Double]: {
    text: 'double',
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
  [SchemaType.Refer]: {
    text: 'refer',
    label: '引用模型',
    varColor: '--color-purple-6',
  },
} as const satisfies Record<SchemaType, { text: string; label?: string; varColor: string }>

export const defaultFieldData: JsonSchema = {
  name: '',
  type: SchemaType.String,
}

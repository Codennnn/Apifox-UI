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
    hexColor: Color.Warning,
  },
  [SchemaType.Integer]: {
    text: 'integer',
    hexColor: Color.Error,
  },
  [SchemaType.Double]: {
    text: 'double',
    hexColor: Color.Error,
  },
  [SchemaType.String]: {
    text: 'string',
    hexColor: '#047857',
  },
  [SchemaType.Boolean]: {
    text: 'boolean',
    hexColor: '#f87171',
  },
  [SchemaType.Array]: {
    text: 'array',
    hexColor: Color.Success,
  },
  [SchemaType.Object]: {
    text: 'object',
    hexColor: Color.Primary,
  },
  [SchemaType.Refer]: {
    text: 'refer',
    label: '引用模型',
    hexColor: Color.Warning,
  },
} as const satisfies Record<SchemaType, { text: string; label?: string; hexColor: string }>

export const defaultFieldData: JsonSchema = {
  name: '',
  type: SchemaType.String,
}

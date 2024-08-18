import type { SchemaType } from './constants'

export interface BaseSchema {
  name?: string
  displayName?: string
  description?: string
}

export interface PrimitiveSchema extends BaseSchema {
  type:
    | SchemaType.Boolean
    | SchemaType.Number
    | SchemaType.Integer
    | SchemaType.String
    | SchemaType.Null
}

export interface ObjectSchema extends BaseSchema {
  type: SchemaType.Object
  properties?: JsonSchema[]
}

export interface ArraySchema extends BaseSchema {
  type: SchemaType.Array
  items: PrimitiveSchema | ObjectSchema | ArraySchema
}

export interface RefSchema extends BaseSchema {
  type: SchemaType.Refer
  $ref: string
}

export type JsonSchema = PrimitiveSchema | ObjectSchema | ArraySchema | RefSchema

export type FieldPath = string

export interface ColumnType {
  key: string
  colClassName?: string
  colStyle?: React.CSSProperties

  render?: (
    text: React.ReactNode,
    record: JsonSchema,
    extraData: {
      disabled?: boolean
      fieldPath: FieldPath[]
    }
  ) => React.ReactNode
}

'use client'

import { useEffect, useState } from 'react'

import { Button, Input } from 'antd'
import { produce } from 'immer'
import { get, set } from 'lodash'

import { type JsonSchema, JsonSchemaEditor, SchemaType } from '@/components/JsonSchema'

const json: JsonSchema = {
  type: SchemaType.Object,
  properties: [],
  // properties: [
  //   {
  //     name: 'A',
  //     type: SchemaType.Integer,
  //     displayName: 'aa',
  //     description: 'aaa',
  //   },
  //   {
  //     name: 'B',
  //     type: SchemaType.Object,
  //     properties: [
  //       {
  //         name: 'B1',
  //         type: SchemaType.String,
  //       },
  //     ],
  //     displayName: 'bb',
  //     description: 'bbb',
  //   },
  //   {
  //     name: 'C',
  //     type: SchemaType.Array,
  //     items: {
  //       type: SchemaType.Object,
  //       properties: [
  //         {
  //           name: 'C1',
  //           type: SchemaType.String,
  //         },
  //       ],
  //     },
  //     displayName: 'cc',
  //   },
  //   {
  //     name: 'D',
  //     type: SchemaType.Refer,
  //     $ref: 'json1',
  //     displayName: 'cc',
  //   },
  // ],
  // displayName: '对象',
  // description: '说明',
}

export default function TestPage() {
  const [jsonSchema, setJsonSchema] = useState<JsonSchema>()

  useEffect(() => {
    setJsonSchema(json)
  }, [])

  const [x, X] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          X(!x)
        }}
      >
        更新
      </Button>
      <Button
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log({ jsonSchema })
        }}
      >
        取值
      </Button>

      <JsonSchemaEditor
        defaultExpandAll
        extraColumns={[
          {
            key: 'extra',
            render: (value, _, { disabled, fieldPath }) => {
              return (
                <Input
                  disabled={disabled}
                  placeholder="自定义"
                  value={typeof value === 'string' ? value : undefined}
                  onChange={(ev) => {
                    setJsonSchema((schema) =>
                      produce(schema, (draft) => {
                        if (draft) {
                          set(draft, fieldPath, {
                            ...get(schema, fieldPath),
                            extra: ev.target.value,
                          })
                        }
                        return draft
                      })
                    )
                  }}
                />
              )
            },
            colStyle: { flex: '0 0 150px' },
          },
        ]}
        value={jsonSchema}
        onChange={(changeSchema) => {
          // eslint-disable-next-line no-console
          console.log('root', changeSchema)
          setJsonSchema(changeSchema)
        }}
      />
    </>
  )
}

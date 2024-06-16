import { Flex, Tag } from 'antd'

import { SchemaType } from '@/components/JsonSchema'
import { JsonSchemaCard } from '@/components/JsonSchemaCard'
import { BodyType } from '@/enums'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDetails } from '@/types'

import { ParamsEditableTable } from '../ParamsEditableTable'

const types = [
  { name: 'none', type: BodyType.None },
  { name: 'form-data', type: BodyType.FormData },
  { name: 'x-www-form-urlencoded', type: BodyType.UrlEncoded },
  { name: 'json', type: BodyType.Json },
  { name: 'xml', type: BodyType.Xml },
  { name: 'raw', type: BodyType.Raw },
  { name: 'binary', type: BodyType.Binary },
]

interface BodyCompProps {
  value?: ApiDetails['requestBody']
  onChange?: (value: BodyCompProps['value']) => void
}

function BodyComp(props: BodyCompProps) {
  const { value, onChange } = props

  const { styles } = useStyles(({ token }, css) => {
    return {
      bodyNone: css({
        color: token.colorTextQuaternary,
        border: `1px solid ${token.colorFillSecondary}`,
      }),
    }
  })

  if (value) {
    switch (value.type) {
      case BodyType.None:
        return (
          <div className={`flex h-24 items-center justify-center rounded ${styles.bodyNone}`}>
            该请求没有 Body 体
          </div>
        )

      case BodyType.FormData:
      case BodyType.UrlEncoded:
        return (
          <ParamsEditableTable
            value={value.parameters}
            onChange={(values) => {
              onChange?.({ ...value, parameters: values })
            }}
          />
        )

      case BodyType.Json:
      case BodyType.Xml:
        return (
          <JsonSchemaCard
            defaultValue={{ type: SchemaType.Object, properties: [] }}
            value={value.jsonSchema}
            onChange={(values) => {
              onChange?.({ ...value, jsonSchema: values })
            }}
          />
        )
    }
  }

  return '-'
}

interface ParamsBodyProps {
  value?: ApiDetails['requestBody']
  onChange?: (value: ParamsBodyProps['value']) => void
}

export function ParamsBody(props: ParamsBodyProps) {
  const { value, onChange } = props

  const selectedType = value?.type || BodyType.None

  return (
    <div>
      <Flex wrap className="p-2" gap={8}>
        {types.map(({ name, type }) => {
          return (
            <Tag.CheckableTag
              key={type}
              checked={type === selectedType}
              onChange={(checked) => {
                if (checked) {
                  onChange?.({ ...value, type })
                }
              }}
            >
              {name}
            </Tag.CheckableTag>
          )
        })}
      </Flex>

      <div>
        <BodyComp value={value || { type: BodyType.None }} onChange={onChange} />
      </div>
    </div>
  )
}

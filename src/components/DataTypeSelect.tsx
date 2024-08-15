import { Dropdown } from 'antd'

import { SchemaType } from '@/components/JsonSchema'
import { defaultSchemaTypeConfig } from '@/components/JsonSchema/constants'
import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface DataTypeSelectProps {
  type?: SchemaType
  disabled?: boolean
  readOnly?: boolean
  onTypeSelect?: (type: SchemaType) => void
}

export function DataTypeSelect(props: DataTypeSelectProps) {
  const { type, disabled, readOnly, onTypeSelect } = props

  const { styles } = useStyles(() => {
    return {
      typeSelect: css({
        cursor: 'pointer',

        '&:hover': {
          textDecoration: 'underline',
        },
      }),
    }
  })

  if (type) {
    return (
      <Dropdown
        arrow
        disabled={disabled}
        menu={{
          activeKey: type,
          onClick: (menuInfo) => {
            onTypeSelect?.(menuInfo.key as SchemaType)
          },
          items: [
            { key: SchemaType.Refer, label: defaultSchemaTypeConfig[SchemaType.Refer].label },
            { key: SchemaType.Void, label: defaultSchemaTypeConfig[SchemaType.Void].text },
            {
              key: SchemaType.Integer,
              label: defaultSchemaTypeConfig[SchemaType.Integer].text,
            },
            { key: SchemaType.Double, label: defaultSchemaTypeConfig[SchemaType.Double].text },
            { key: SchemaType.String, label: defaultSchemaTypeConfig[SchemaType.String].text },
            {
              key: SchemaType.Boolean,
              label: defaultSchemaTypeConfig[SchemaType.Boolean].text,
            },
            { key: SchemaType.Object, label: defaultSchemaTypeConfig[SchemaType.Object].text },
            { key: SchemaType.Array, label: defaultSchemaTypeConfig[SchemaType.Array].text },
          ],
        }}
        trigger={['click']}
      >
        {
          <span
            className={readOnly ? undefined : styles.typeSelect}
            style={{ color: `var(${defaultSchemaTypeConfig[type].varColor})` }}
          >
            {defaultSchemaTypeConfig[type].text}
          </span>
        }
      </Dropdown>
    )
  }

  return null
}

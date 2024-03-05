import { Tabs, theme, Typography } from 'antd'

import { ParamsEditableTable } from '@/components/tab-content/api/ParamsEditableTable'
import type { ApiDetails } from '@/types'

function BadgeLabel(props: React.PropsWithChildren<{ count?: number }>) {
  const { token } = theme.useToken()

  const { children, count } = props

  return (
    <span>
      {children}

      {count && (
        <span
          className="ml-1 inline-flex size-4 items-center justify-center rounded-full text-xs"
          style={{ backgroundColor: token.colorFillContent, color: token.colorSuccessActive }}
        >
          {count}
        </span>
      )}
    </span>
  )
}

type Parameters = ApiDetails['parameters']

interface ParamsTabProps {
  value?: Parameters
  onChange?: (value: ParamsTabProps['value']) => void
}

/**
 * 请求参数页签。
 */
export function ParamsTab(props: ParamsTabProps) {
  const { value, onChange } = props

  return (
    <Tabs
      animated={false}
      items={[
        {
          key: 'params',
          label: (
            <BadgeLabel count={(value?.query?.length || 0) + (value?.path?.length || 0)}>
              Params
            </BadgeLabel>
          ),
          children: (
            <div>
              <div className="my-2">
                <Typography.Text type="secondary">Query 参数</Typography.Text>
              </div>
              <ParamsEditableTable
                value={value?.query}
                onChange={(query) => {
                  onChange?.({ ...value, query })
                }}
              />

              {value?.path ? (
                <>
                  <div className="my-2">
                    <Typography.Text type="secondary">Path 参数</Typography.Text>
                  </div>
                  <ParamsEditableTable
                    value={value.path}
                    onChange={(query) => {
                      onChange?.({ ...value, query })
                    }}
                  />
                </>
              ) : null}
            </div>
          ),
        },
        {
          key: 'body',
          label: 'Body',
          children: <div>-</div>,
        },
        {
          key: 'cookie',
          label: 'Cookie',
          children: (
            <div className="pt-[10px]">
              <ParamsEditableTable
                value={value?.cookie}
                onChange={(cookie) => {
                  onChange?.({ ...value, cookie })
                }}
              />
            </div>
          ),
        },
        {
          key: 'headers',
          label: 'Headers',
          children: (
            <div className="pt-[10px]">
              <ParamsEditableTable
                value={value?.header}
                onChange={(header) => {
                  onChange?.({ ...value, header })
                }}
              />
            </div>
          ),
        },
      ]}
    />
  )
}

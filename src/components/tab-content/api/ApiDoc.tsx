import { useMemo } from 'react'

import { Viewer } from '@bytemd/react'
import { Button, Card, Select, type SelectProps, Space, Tabs, theme, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { Code2Icon, ZapIcon } from 'lucide-react'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { API_STATUS_CONFIG, HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { creator } from '@/data/remote'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDetails, Parameter } from '@/types'

import { css } from '@emotion/css'

const statusOptions: SelectProps['options'] = Object.entries(API_STATUS_CONFIG).map(
  ([method, { text, color }]) => {
    return {
      value: method,
      label: (
        <span className="flex items-center">
          <span
            className="mr-2 inline-block size-[6px] rounded-full"
            style={{ backgroundColor: `var(${color})` }}
          />
          <span>{text}</span>
        </span>
      ),
    }
  }
)

function GroupTitle(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h2 className={`text-base font-semibold opacity-80 ${props.className ?? ''}`}>
      {props.children}
    </h2>
  )
}

function BaseInfoItem({ label, value }: { label: string; value?: string }) {
  const { token } = theme.useToken()

  return (
    <div>
      <span style={{ color: token.colorTextTertiary }}>{label}</span>
      <span className="ml-2" style={{ color: token.colorTextSecondary }}>
        {value || '-'}
      </span>
    </div>
  )
}

function ApiParameter({ param }: { param: Parameter }) {
  const { token } = theme.useToken()

  const isLongDesc = param.description?.includes('\n')

  return (
    <div>
      <Space>
        <span
          className="inline-flex items-center text-xs font-semibold"
          style={{
            padding: `${token.paddingXXS}px ${token.paddingXS}px`,
            color: token.colorPrimary,
            backgroundColor: token.colorPrimaryBg,
            borderRadius: token.borderRadiusSM,
          }}
        >
          {param.name}
        </span>

        <span
          className="font-semibold"
          style={{
            color: token.colorTextSecondary,
          }}
        >
          {param.type}
        </span>

        {!isLongDesc && (
          <span
            className="text-xs"
            style={{
              color: token.colorTextDescription,
            }}
          >
            {param.description}
          </span>
        )}
      </Space>

      {isLongDesc && (
        <div
          className="mt-2 text-xs"
          style={{
            color: token.colorTextDescription,
          }}
        >
          <Viewer value={param.description || ''} />
        </div>
      )}

      <div className="ml-1 mt-2">
        <span className="text-xs">示例值：</span>
        <span
          className="text-xs"
          style={{
            padding: `0 ${token.paddingXXS}px`,
            color: token.colorTextDescription,
            backgroundColor: token.colorFillQuaternary,
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: token.borderRadiusSM,
          }}
        >
          {param.example}
        </span>
      </div>
    </div>
  )
}

export function ApiDoc() {
  const { token } = theme.useToken()

  const { messageApi } = useGlobalContext()
  const { menuRawList } = useMenuHelpersContext()
  const { tabData } = useTabContentContext()

  const { docValue, methodConfig } = useMemo(() => {
    const apiDetails = menuRawList?.find(({ id }) => id === tabData.key)?.data as
      | ApiDetails
      | undefined

    let methodConfig

    if (apiDetails) {
      methodConfig = HTTP_METHOD_CONFIG[apiDetails.method]
    }

    return { docValue: apiDetails, methodConfig }
  }, [menuRawList, tabData.key])

  const { styles } = useStyles(({ token }) => {
    return {
      card: css({
        '&.ant-card': {
          '> .ant-card-head': {
            minHeight: 'unset',
            fontWeight: 'normal',
            padding: `0 ${token.paddingSM}px`,
            fontSize: token.fontSize,

            '.ant-card-head-title': {
              padding: `${token.paddingXS}px 0`,
            },
          },
        },
      }),

      tabWithBorder: css({
        '.ant-tabs-content-holder': {
          border: `1px solid ${token.colorBorderSecondary}`,
          borderTop: 'none',
          borderBottomLeftRadius: token.borderRadius,
          borderBottomRightRadius: token.borderRadius,
        },
      }),
    }
  })

  if (!docValue || !methodConfig) {
    return null
  }

  const hasPathParams =
    Array.isArray(docValue.parameters?.path) && docValue.parameters.path.length > 0
  const hasQueryParams =
    Array.isArray(docValue.parameters?.query) && docValue.parameters.query.length > 0
  const hasParams = hasPathParams || hasQueryParams

  const pathParams = docValue.parameters?.path
  const queryParams = docValue.parameters?.query

  return (
    <div className="h-full overflow-auto p-tabContent">
      <div className="flex items-center">
        <Space className="group/action">
          <h2 className="text-base font-semibold">{docValue.name}</h2>

          <Space className="opacity-0 group-hover/action:opacity-100" size="small">
            <Tooltip title="复制 ID">
              <Button
                size="small"
                type="link"
                onClick={() => {
                  navigator.clipboard.writeText(docValue.id).then(() => {
                    messageApi.success('已复制')
                  })
                }}
              >
                #{docValue.id}
              </Button>
            </Tooltip>
          </Space>
        </Space>

        <Space className="ml-auto pl-2">
          <Button type="primary">
            <IconText icon={<ZapIcon size={14} />} text="运行" />
          </Button>

          <Button>
            <IconText icon={<Code2Icon size={14} />} text="生成代码" />
          </Button>

          <ApiRemoveButton tabKey={tabData.key} />
        </Space>
      </div>

      <div className="mb-3">
        <span
          className="mr-2 px-2 py-1 text-xs/6 font-bold text-white"
          style={{
            backgroundColor: `var(${methodConfig.color})`,
            borderRadius: token.borderRadiusOuter,
          }}
        >
          {docValue.method}
        </span>
        <span className="mr-2">{docValue.path}</span>
        <Select options={statusOptions} value={docValue.status} variant="borderless" />
      </div>

      <div className="mb-3">
        <Space>
          {docValue.tags?.map((tag) => {
            return (
              <span
                key={tag}
                className="px-2 py-1 text-xs"
                style={{
                  color: token.colorPrimary,
                  backgroundColor: token.colorPrimaryBg,
                  borderRadius: token.borderRadiusXS,
                }}
              >
                {tag}
              </span>
            )
          })}
        </Space>
      </div>

      <div>
        <Space wrap size="large">
          <BaseInfoItem label="创建时间" value={dayjs(docValue.createdAt).format('YYYY年M月D日')} />
          <BaseInfoItem label="修改时间" value={dayjs(docValue.updatedAt).format('YYYY年M月D日')} />
          <BaseInfoItem label="修改者" value={creator.name} />
          <BaseInfoItem label="创建者" value={creator.name} />
          <BaseInfoItem label="责任人" value={creator.name} />
        </Space>
      </div>

      {docValue.description ? (
        <div>
          <GroupTitle>接口说明</GroupTitle>
          <Viewer value={docValue.description} />
        </div>
      ) : null}

      <div>
        <GroupTitle>请求参数</GroupTitle>
        {hasParams ? (
          <div className="flex flex-col gap-y-4">
            {hasPathParams && (
              <Card className={styles.card} title="Path 参数">
                <div className="flex flex-col gap-3">
                  {pathParams?.map((param) => <ApiParameter key={param.id} param={param} />)}
                </div>
              </Card>
            )}

            {hasQueryParams && (
              <Card className={styles.card} title="Query 参数">
                <div className="flex flex-col gap-3">
                  {queryParams?.map((param) => <ApiParameter key={param.id} param={param} />)}
                </div>
              </Card>
            )}
          </div>
        ) : (
          '无'
        )}
      </div>

      {!!docValue.responses && (
        <div>
          <GroupTitle>返回响应</GroupTitle>
          <Tabs
            className={styles.tabWithBorder}
            items={docValue.responses.map((res) => {
              return {
                key: res.id,
                label: `${res.name}(${res.code})`,
                children: (
                  <div>
                    <div className="flex flex-wrap items-center gap-4 p-3">
                      <span>
                        <span style={{ color: token.colorTextSecondary }}>HTTP 状态码：</span>
                        <span>{res.code}</span>
                      </span>

                      <span>
                        <span style={{ color: token.colorTextSecondary }}>内容格式：</span>
                        <span>{res.contentType}</span>
                      </span>
                    </div>
                  </div>
                ),
              }
            })}
            type="card"
          />
        </div>
      )}
    </div>
  )
}

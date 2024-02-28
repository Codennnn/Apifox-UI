import { useMemo } from 'react'

import { Button, Dropdown, Select, type SelectProps, Space, theme, Tooltip } from 'antd'
import dayjs from 'dayjs'
import { Code2Icon, Link2Icon, ZapIcon } from 'lucide-react'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { API_STATUS_CONFIG, HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { creator } from '@/data/remote'
import type { ApiDetails } from '@/types'

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

export function ApiDoc() {
  const { token } = theme.useToken()

  const { menuRawList } = useGlobalContext()
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

  if (!docValue || !methodConfig) {
    return null
  }

  return (
    <div>
      <div className="flex items-center">
        <Space className="group/action">
          <h2 className="text-base font-medium">{docValue.name}</h2>

          <Space className="opacity-0 group-hover/action:opacity-100" size="small">
            <Tooltip title="复制 ID">
              <Button size="small" type="link">
                <IconText icon={<Link2Icon size={14} />} text={docValue.id} />
              </Button>
            </Tooltip>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: '复制协作链接',
                  },
                  {
                    key: '2',
                    label: '复制接口信息',
                  },
                ],
              }}
            >
              <Button size="small" type="text">
                <IconText icon={<Link2Icon size={14} />} />
              </Button>
            </Dropdown>
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
          {docValue.tags?.map((tag, idx) => {
            return (
              <span
                key={`${idx}`}
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
    </div>
  )
}

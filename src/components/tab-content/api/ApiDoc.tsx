import { useMemo } from 'react'

import { Button, Dropdown, Select, type SelectProps, Space, theme, Tooltip } from 'antd'
import { Code2Icon, Link2Icon, ZapIcon } from 'lucide-react'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'
import { API_STATUS_CONFIG, HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
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

type BaseInfo = Record<
  keyof Pick<ApiDetails, 'createdAt' | 'updatedAt' | 'editorId' | 'creatorId' | 'responsibleId'>,
  string
>

function BaseInfoItem({ label, value }: { label: string; value: string }) {
  const { token } = theme.useToken()

  return (
    <div>
      <span style={{ color: token.colorTextTertiary }}>{label}</span>
      <span className="ml-2" style={{ color: token.colorTextSecondary }}>
        {value}
      </span>
    </div>
  )
}

export function ApiDoc() {
  const { token } = theme.useToken()

  const { menuRawList } = useGlobalContext()
  const { tabData } = useTabContentContext()

  const { docValue, methodConfig } = useMemo(() => {
    const data = menuRawList?.find(({ id }) => id === tabData.key)!.data as ApiDetails | undefined

    let methodConfig

    if (data) {
      methodConfig = HTTP_METHOD_CONFIG[data.method]
    }

    return { docValue: data, methodConfig }
  }, [menuRawList, tabData.key])

  const info = useMemo<BaseInfo>(() => {
    return {
      createdAt: '2021年10月19日',
      updatedAt: '5小时前',
      editorId: '令狐冲',
      creatorId: '令狐冲',
      responsibleId: '未设置',
    }
  }, [])

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

          <Button>删除</Button>
        </Space>
      </div>

      <div>
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

      <div>
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
          <BaseInfoItem label="创建时间" value={info.createdAt} />
          <BaseInfoItem label="修改时间" value={info.updatedAt} />
          <BaseInfoItem label="修改者" value={info.editorId} />
          <BaseInfoItem label="创建者" value={info.creatorId} />
          <BaseInfoItem label="责任人" value={info.responsibleId} />
        </Space>
      </div>
    </div>
  )
}

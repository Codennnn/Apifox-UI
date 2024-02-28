import { useEffect } from 'react'

import Link from 'next/link'
import { Button, Col, Form, Input, Row, Select, type SelectProps, Space, Tabs, Tooltip } from 'antd'
import { InfoIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { GroupTitle } from '@/components/ApiTab/GroupTitle'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { JsonSchemaCard } from '@/components/JsonSchemaCard'
import { JsonViewer } from '@/components/JsonViewer'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { UnderlineInput } from '@/components/UnderlineInput'
import { API_STATUS_CONFIG, HTTP_CODE_CONFIG, HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { creator, initialCreateApiDetailsData } from '@/data/remote'
import { MenuItemType } from '@/enums'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDetails } from '@/types'

import { ParamsTab } from './ParamsTab'

import { css } from '@emotion/css'

const methodOptions: SelectProps['options'] = Object.entries(HTTP_METHOD_CONFIG).map(
  ([method, { color }]) => {
    return {
      value: method,
      label: (
        <span className="font-semibold" style={{ color: `var(${color})` }}>
          {method}
        </span>
      ),
    }
  }
)

const serviceOptions: SelectProps['options'] = [
  {
    label: '默认设置',
    options: [
      {
        label: (
          <span className="flex items-center justify-between font-normal">
            <span>继承父级</span>
            <span className="ml-10 truncate opacity-50">跟随父级目录设置（推荐）</span>
          </span>
        ),
        value: '',
      },
    ],
  },
  {
    label: '手动指定',
    options: [
      {
        label: (
          <span className="flex items-center justify-between font-normal">
            <span>默认服务</span>
            <span className="ml-10 truncate opacity-50">http://127.0.0.1（正式环境）</span>
          </span>
        ),
        value: 'default',
      },
    ],
  },
]

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

const httpCodeOptions: SelectProps['options'] = Object.entries(HTTP_CODE_CONFIG).map(
  ([, { text, value, desc }]) => {
    return {
      label: value,
      value,
      text,
      desc,
    }
  }
)

const contentTypeOptions: SelectProps['options'] = [
  { label: 'JSON', value: 'json' },
  { label: 'XML', value: 10 },
  { label: 'HTML', value: 204 },
  { label: 'Raw', value: 400 },
  { label: 'Binary', value: 401 },
  { label: 'MsgPack', value: 403 },
]

export function ApiDocEditing() {
  const [form] = Form.useForm<ApiDetails>()

  const { menuRawList, addMenuItem, updateMenuItem } = useGlobalContext()
  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()

  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create

  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      if (menuRawList) {
        const menuData = menuRawList.find(({ id }) => id === tabData.key)

        if (menuData && menuData.type === MenuItemType.ApiDetail) {
          const apiDetails = menuData.data

          if (apiDetails) {
            form.setFieldsValue(apiDetails)
          }
        }
      }
    }
  }, [form, menuRawList, isCreating, tabData.key])

  const { styles } = useStyles(({ token }) => {
    return {
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

  return (
    <Form
      className="flex h-full flex-col"
      form={form}
      onFinish={(values) => {
        const menuName = values.name || '未命名接口'

        if (isCreating) {
          const menuItemId = nanoid()

          addMenuItem({
            id: menuItemId,
            name: menuName,
            type: MenuItemType.ApiDetail,
            data: values,
          })

          addTabItem(
            {
              key: menuItemId,
              label: menuName,
              contentType: MenuItemType.ApiDetail,
            },
            { replaceTab: tabData.key }
          )
        } else {
          updateMenuItem({
            id: tabData.key,
            name: menuName,
            data: { ...values, name: menuName },
          })
        }
      }}
    >
      <div className="flex items-center px-tabContent py-3">
        <Space.Compact className="flex-1">
          <Form.Item noStyle name="method">
            <Select
              showSearch
              className="min-w-[110px]"
              options={methodOptions}
              popupClassName="!min-w-[120px]"
            />
          </Form.Item>
          <Form.Item noStyle name="path">
            <Input placeholder="接口路径，“/”起始" />
          </Form.Item>
        </Space.Compact>

        <Space className="ml-auto pl-2">
          <Button htmlType="submit" type="primary">
            保存
          </Button>

          {!isCreating && (
            <>
              <Button>运行</Button>
              <ApiRemoveButton tabKey={tabData.key} />
            </>
          )}
        </Space>
      </div>

      <div className="flex-1 overflow-y-auto p-tabContent pt-0">
        <Form.Item noStyle name="name">
          <UnderlineInput placeholder="未命名接口" />
        </Form.Item>

        <div className="pt-2">
          <Row gutter={16}>
            <Col lg={12} xl={6}>
              <Form.Item
                label="状态"
                labelCol={{ span: 24 }}
                name="status"
                rules={[{ required: true }]}
              >
                <Select options={statusOptions} />
              </Form.Item>
            </Col>

            <Col lg={12} xl={6}>
              <Form.Item label="责任人" labelCol={{ span: 24 }} name="responsibleId">
                <Select
                  options={[
                    { label: `${creator.name}（@${creator.username}）`, value: creator.id },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col lg={12} xl={6}>
              <Form.Item label="标签" labelCol={{ span: 24 }} name="tags">
                <Select mode="tags" placeholder="查找或回车创建标签" />
              </Form.Item>
            </Col>

            <Col lg={12} xl={6}>
              <Form.Item
                label="服务（前置 URL）"
                labelCol={{ span: 24 }}
                name="serverId"
                tooltip={
                  <span>
                    指定服务后，该接口运行时会使用该服务对应的<b>前置 URL</b>（在
                    <Link href="/">环境</Link>里设置）。
                  </span>
                }
              >
                <Select options={serviceOptions} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="说明" labelCol={{ span: 24 }} name="description">
                <Input.TextArea placeholder="支持 Markdown 格式" rows={3} />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <GroupTitle>请求参数</GroupTitle>
        <ParamsTab />

        <GroupTitle>返回响应</GroupTitle>
        <Tabs
          animated={false}
          className={styles.tabWithBorder}
          items={[
            {
              key: '1',
              label: '成功(200)',
              children: (
                <div className="p-tabContent">
                  <Row>
                    <Col className="px-8" lg={8} md={6}>
                      <Form.Item label="HTTP 状态码" name={['responses', 0, 'code']}>
                        <Select
                          optionRender={({ label, data }) => (
                            <span className="group flex items-center">
                              {label}
                              <span className="ml-3 font-normal opacity-65">
                                {data.text as string}
                              </span>
                              <Tooltip title={`${data.desc as string}。`}>
                                <InfoIcon
                                  className="ml-auto mr-1 opacity-0 transition-opacity group-hover:opacity-100"
                                  size={14}
                                />
                              </Tooltip>
                            </span>
                          )}
                          options={httpCodeOptions}
                        />
                      </Form.Item>
                    </Col>
                    <Col className="px-8" lg={8} md={6}>
                      <Form.Item label="名称" name={['responses', 0, 'name']}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col className="px-8" lg={8} md={6}>
                      <Form.Item label="内容格式" name={['responses', 0, 'contentType']}>
                        <Select options={contentTypeOptions} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item noStyle name={['responses', 0, 'jsonSchema']}>
                    <JsonSchemaCard />
                  </Form.Item>

                  <Form.Item dependencies={['responseExamples']}>
                    {({ getFieldValue }) => {
                      const examples = getFieldValue([
                        'responseExamples',
                      ]) as ApiDetails['responseExamples']
                      return (
                        <Tabs
                          className={styles.tabWithBorder}
                          items={examples?.map((it, idx) => {
                            return {
                              key: it.id,
                              label: it.name,
                              children: (
                                <div className="p-tabContent">
                                  <Form.Item noStyle name={['responseExamples', idx, 'data']}>
                                    <JsonViewer />
                                  </Form.Item>
                                </div>
                              ),
                            }
                          })}
                          type="card"
                        />
                      )
                    }}
                  </Form.Item>
                </div>
              ),
            },
            {
              key: '2',
              label: '公共响应',
            },
          ]}
          type="card"
        />
      </div>
    </Form>
  )
}

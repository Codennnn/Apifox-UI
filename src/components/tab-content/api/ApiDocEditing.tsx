import { useEffect } from 'react'

import Link from 'next/link'
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  Row,
  Select,
  type SelectProps,
  Space,
  Tabs,
  theme,
} from 'antd'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { GroupTitle } from '@/components/ApiTab/GroupTitle'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { JsonSchemaEditor } from '@/components/JsonSchema'
import { JsonViewer } from '@/components/JsonViewer'
import { API_STATUS_CONFIG, HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { creator, initialCreateApiDetailsData } from '@/data/remote'
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

const httpCodeOptions: SelectProps['options'] = [
  { label: '200', value: 200 },
  { label: '201', value: 201 },
  { label: '204', value: 204 },
  { label: '400', value: 400 },
  { label: '401', value: 401 },
  { label: '403', value: 403 },
  { label: '404', value: 404 },
  { label: '500', value: 500 },
  { label: '502', value: 502 },
  { label: '503', value: 503 },
  { label: '504', value: 504 },
]

const contentTypeOptions: SelectProps['options'] = [
  { label: 'JSON', value: 'json' },
  { label: 'XML', value: 10 },
  { label: 'HTML', value: 204 },
  { label: 'Raw', value: 400 },
  { label: 'Binary', value: 401 },
  { label: 'MsgPack', value: 403 },
]

export function ApiDocEditing() {
  const { token } = theme.useToken()

  const [form] = Form.useForm<ApiDetails>()

  const { menuRawList } = useGlobalContext()
  const { tabData } = useTabContentContext()
  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create

  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      if (menuRawList) {
        const apiDetails = menuRawList.find(({ id }) => id === tabData.key)?.data

        if (apiDetails) {
          form.setFieldsValue(apiDetails as ApiDetails)
        }
      }
    }
  }, [form, menuRawList, isCreating, tabData.key])

  const { styles } = useStyles(({ token }) => {
    return {
      nameInput: css({
        borderBottom: '1px solid transparent',

        '&:hover': {
          borderColor: token.colorBorder,
        },

        '&:focus': {
          borderColor: token.colorPrimary,
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

  return (
    <Form className="flex h-full flex-col" form={form}>
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
          <Button type="primary">保存</Button>

          {!isCreating && (
            <>
              <Button>运行</Button>
              <Button>删除</Button>
            </>
          )}
        </Space>
      </div>

      <div className="flex-1 overflow-y-auto p-tabContent pt-0">
        <ConfigProvider
          theme={{
            components: {
              Input: { borderRadiusLG: 0, paddingInlineLG: 0, paddingBlockLG: token.paddingXXS },
            },
          }}
        >
          <Form.Item noStyle name="name">
            <Input
              className={`font-medium ${styles.nameInput}`}
              placeholder="未命名接口"
              size="large"
              variant="borderless"
            />
          </Form.Item>
        </ConfigProvider>

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
                        <Select options={httpCodeOptions} />
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

                  <div
                    style={{
                      border: `1px solid ${token.colorBorderSecondary}`,
                      borderRadius: token.borderRadius,
                      marginBottom: token.marginSM,
                    }}
                  >
                    <div
                      className="flex justify-end"
                      style={{
                        padding: token.paddingSM,
                        borderBottom: `1px solid ${token.colorBorderSecondary}`,
                      }}
                    >
                      <Space size={token.paddingXXS}>
                        <Button size="small" type="text">
                          生成代码
                        </Button>
                        <Button size="small" type="text">
                          JSON Schema
                        </Button>
                      </Space>
                    </div>

                    <div style={{ padding: token.paddingSM }}>
                      <Form.Item noStyle name={['responses', 0, 'jsonSchema']}>
                        <JsonSchemaEditor />
                      </Form.Item>
                    </div>
                  </div>

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

import { useEffect } from 'react'

import Link from 'next/link'
import { Button, Col, Form, Input, Row, Select, type SelectProps, Space, Tabs } from 'antd'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { JsonSchemaEditor } from '@/components/JsonSchema'
import { JsonViewer } from '@/components/JsonViewer'
import { API_STATUS_CONFIG, HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import type { ApiDetails } from '@/types'

import { ParamsTab } from './ParamsTab'

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
  const [form] = Form.useForm<ApiDetails>()

  const { menuRawList } = useGlobalContext()
  const { tabData } = useTabContentContext()

  useEffect(() => {
    if (menuRawList) {
      form.setFieldsValue(menuRawList.find(({ id }) => id === tabData.key)!.data as ApiDetails)
    }
  }, [form, menuRawList, tabData.key])

  return (
    <Form form={form}>
      <div className="flex items-center">
        <Space.Compact className="flex-1">
          <Form.Item noStyle name="method">
            <Select
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

          <Button>运行</Button>

          <Button>删除</Button>
        </Space>
      </div>

      <div className="overflow-y-auto">
        <Form.Item noStyle name="name">
          <Input
            className="font-medium"
            placeholder="未命名接口"
            size="large"
            variant="borderless"
          />
        </Form.Item>

        <div className="overflow-x-hidden">
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
                <Select />
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

        <ParamsTab />

        <Tabs
          items={[
            {
              key: '1',
              label: '成功响应',
              children: (
                <div>
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

                  <Form.Item noStyle name={['responses', 0, 'jsonSchema']}>
                    <JsonSchemaEditor />
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

        <Form.Item dependencies={['responseExamples']}>
          {({ getFieldValue }) => {
            const examples = getFieldValue(['responseExamples']) as ApiDetails['responseExamples']
            return (
              <Tabs
                items={examples?.map((it, idx) => {
                  return {
                    key: it.id,
                    label: it.name,
                    children: (
                      <Form.Item noStyle name={['responseExamples', idx, 'data']}>
                        <JsonViewer />
                      </Form.Item>
                    ),
                  }
                })}
                type="card"
              />
            )
          }}
        </Form.Item>
      </div>
    </Form>
  )
}

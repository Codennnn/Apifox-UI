import { useEffect, useState } from 'react'

import {
  Button,
  Form,
  type FormProps,
  Input,
  Popconfirm,
  Select,
  type SelectProps,
  Space,
  Tabs,
  theme,
  Tooltip,
} from 'antd'
import { InfoIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { GroupTitle } from '@/components/ApiTab/GroupTitle'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { IconText } from '@/components/IconText'
import { InputUnderline } from '@/components/InputUnderline'
import { JsonSchemaCard } from '@/components/JsonSchemaCard'
import { JsonViewer } from '@/components/JsonViewer'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { initialCreateApiDetailsData } from '@/data/remote'
import { type ContentType, MenuItemType, ParamType } from '@/enums'
import { getContentTypeString } from '@/helpers'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDetails } from '@/types'

import { BaseFormItems } from './components/BaseFormItems'
import { PathInput } from './components/PathInput'
import { ParamsTab } from './params/ParamsTab'
import { contentTypeOptions, httpCodeOptions, ModalNewResponse } from './ModalNewResponse'

import { css } from '@emotion/css'

const DEFAULT_NAME = '未命名接口'

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

export function ApiDocEditing() {
  const { token } = theme.useToken()

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

  const [form] = Form.useForm<ApiDetails>()

  const { messageApi } = useGlobalContext()
  const { menuRawList, addMenuItem, updateMenuItem } = useMenuHelpersContext()
  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()

  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create

  useEffect(() => {
    if (isCreating) {
      form.setFieldsValue(initialCreateApiDetailsData)
    } else {
      if (menuRawList) {
        const menuData = menuRawList.find(({ id }) => id === tabData.key)

        if (
          menuData &&
          (menuData.type === MenuItemType.ApiDetail || menuData.type === MenuItemType.HttpRequest)
        ) {
          const apiDetails = menuData.data

          if (apiDetails) {
            form.setFieldsValue(apiDetails)
          }
        }
      }
    }
  }, [form, menuRawList, isCreating, tabData.key])

  const handleFinish: FormProps<ApiDetails>['onFinish'] = (values) => {
    const menuName = values.name || DEFAULT_NAME

    if (isCreating) {
      const menuItemId = nanoid(6)

      addMenuItem({
        id: menuItemId,
        name: menuName,
        type: MenuItemType.ApiDetail,
        data: { ...values, name: menuName },
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

      messageApi.success('保存成功')
    }
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [activeResTabKey, setActiveResTabKey] = useState<string>()

  const handleValuesChange = (changedValues: Partial<ApiDetails>) => {
    const { path } = changedValues

    if (typeof path === 'string') {
      const regex = /\{([^}]+)\}/g

      let match: RegExpExecArray | null
      const pathParams: string[] = []

      while ((match = regex.exec(path)) !== null) {
        // match[1] 是第一个捕获组的值，即参数名。
        pathParams.push(match[1])
      }

      const oldParameters = form.getFieldValue('parameters') as ApiDetails['parameters']
      const oldPath = oldParameters?.path

      const newPath =
        pathParams.length >= (oldPath?.length || 0)
          ? pathParams.reduce(
              (acc, cur, curIdx) => {
                const target = oldPath?.at(curIdx)

                if (target) {
                  acc.splice(curIdx, 1, { ...target, name: cur })
                } else {
                  acc.push({
                    id: nanoid(4),
                    name: cur,
                    type: ParamType.String,
                    required: true,
                  })
                }

                return acc
              },
              [...(oldPath || [])]
            )
          : oldPath?.slice(0, pathParams.length)

      const newParameters: ApiDetails['parameters'] = { ...oldParameters, path: newPath }

      form.setFieldValue('parameters', newParameters)
    }
  }

  return (
    <>
      <Form<ApiDetails>
        className="flex h-full flex-col"
        form={form}
        onFinish={(values) => {
          handleFinish(values)
        }}
        onValuesChange={handleValuesChange}
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
              <PathInput />
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

        <div className="flex-1 overflow-y-auto p-tabContent">
          <Form.Item noStyle name="name">
            <InputUnderline placeholder={DEFAULT_NAME} />
          </Form.Item>

          <div className="pt-2">
            <BaseFormItems />
          </div>

          <GroupTitle className="mt-2">请求参数</GroupTitle>
          <Form.Item noStyle name="parameters">
            <ParamsTab />
          </Form.Item>

          <GroupTitle className="mb-3 mt-8">返回响应</GroupTitle>
          <Form.Item
            shouldUpdate={(prev: ApiDetails, curr: ApiDetails) => prev.responses !== curr.responses}
          >
            {({ getFieldValue }) => {
              const responses: ApiDetails['responses'] = getFieldValue('responses')

              return (
                <Tabs
                  activeKey={activeResTabKey}
                  animated={false}
                  className={styles.tabWithBorder}
                  items={responses?.map((resp, idx) => {
                    const onlyOneRes = responses.length === 1

                    return {
                      key: resp.id,
                      label: `${resp.name}(${resp.code})`,
                      children: (
                        <div className="p-tabContent">
                          <div className="mb-tabContent flex gap-6">
                            <div className="flex flex-wrap items-center gap-6">
                              <Form.Item
                                label="HTTP 状态码"
                                name={['responses', idx, 'code']}
                                style={{ marginBottom: 0 }}
                              >
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
                                  popupClassName="min-w-[350px]"
                                />
                              </Form.Item>
                              <Form.Item
                                label="名称"
                                name={['responses', idx, 'name']}
                                style={{ marginBottom: 0 }}
                              >
                                <Input style={{ width: '88px' }} />
                              </Form.Item>
                              <Form.Item
                                label="内容格式"
                                name={['responses', idx, 'contentType']}
                                style={{ marginBottom: 0 }}
                              >
                                <Select options={contentTypeOptions} style={{ width: '130px' }} />
                              </Form.Item>
                              <Form.Item
                                dependencies={['responses', idx, 'contentType']}
                                label="Content-Type"
                                style={{ marginBottom: 0 }}
                              >
                                {({ getFieldValue: getFieldValue1 }) => {
                                  const contentType: ContentType = getFieldValue1([
                                    'responses',
                                    idx,
                                    'contentType',
                                  ])

                                  return <span>{getContentTypeString(contentType)}</span>
                                }}
                              </Form.Item>
                            </div>

                            {!onlyOneRes && (
                              <div className="ml-auto pt-1">
                                <Popconfirm
                                  title={
                                    <span>
                                      确定删除？确定后点击右上角<strong>保存</strong>按钮生效
                                    </span>
                                  }
                                  onConfirm={() => {
                                    const newResponses = responses.filter((_, i) => i !== idx)

                                    form.setFieldValue('responses', newResponses)

                                    setActiveResTabKey(newResponses.at(0)?.id)
                                  }}
                                >
                                  <Button
                                    size="small"
                                    style={{
                                      color: token.colorTextSecondary,
                                    }}
                                    type="text"
                                  >
                                    <IconText icon={<TrashIcon size={14} />} />
                                  </Button>
                                </Popconfirm>
                              </div>
                            )}
                          </div>

                          <Form.Item noStyle name={['responses', idx, 'jsonSchema']}>
                            <JsonSchemaCard editorProps={{ defaultExpandAll: true }} />
                          </Form.Item>

                          <Form.Item noStyle dependencies={['responseExamples']}>
                            {({ getFieldValue: getFieldValue2 }) => {
                              const examples: ApiDetails['responseExamples'] = getFieldValue2([
                                'responseExamples',
                              ])
                              const targetExamples = examples?.filter(
                                ({ responseId }) => responseId === resp.id
                              )

                              if (Array.isArray(targetExamples) && targetExamples.length > 0) {
                                return (
                                  <Tabs
                                    className={styles.tabWithBorder}
                                    items={targetExamples.map((it) => {
                                      const targetIdx = examples?.findIndex(
                                        (itt) => itt.id === it.id
                                      )

                                      return {
                                        key: it.id,
                                        label: it.name,
                                        children:
                                          typeof targetIdx === 'number' && targetIdx !== -1 ? (
                                            <div className="p-tabContent">
                                              <Form.Item
                                                noStyle
                                                name={['responseExamples', targetIdx, 'data']}
                                              >
                                                <JsonViewer />
                                              </Form.Item>
                                            </div>
                                          ) : null,
                                      }
                                    })}
                                    type="card"
                                  />
                                )
                              }

                              return null
                            }}
                          </Form.Item>
                        </div>
                      ),
                    }
                  })}
                  tabBarExtraContent={
                    <>
                      <Button
                        icon={<PlusIcon size={16} />}
                        type="text"
                        onClick={() => {
                          setModalOpen(true)
                        }}
                      >
                        添加
                      </Button>
                    </>
                  }
                  type="card"
                  onTabClick={(tabKey) => {
                    setActiveResTabKey(tabKey)
                  }}
                />
              )
            }}
          </Form.Item>
        </div>
      </Form>

      <ModalNewResponse
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
        }}
        onFinish={(values) => {
          setModalOpen(false)

          const newResId = nanoid(6)

          form.setFieldsValue({
            responses: [
              ...((form.getFieldValue('responses') as ApiDetails['responses']) || []),
              { ...values, id: newResId },
            ],
          })

          setActiveResTabKey(newResId)
        }}
      />
    </>
  )
}

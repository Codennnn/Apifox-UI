import { useState } from 'react'

import { Button, Form, Input, Popconfirm, Select, Tabs, theme, Tooltip } from 'antd'
import { InfoIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { nanoid } from 'nanoid'

import { IconText } from '@/components/IconText'
import { JsonSchemaCard } from '@/components/JsonSchemaCard'
import { JsonViewer } from '@/components/JsonViewer'
import {
  contentTypeOptions,
  httpCodeOptions,
  ModalNewResponse,
} from '@/components/tab-content/api/ModalNewResponse'
import type { ContentType } from '@/enums'
import { getContentTypeString } from '@/helpers'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDetails } from '@/types'

import { css } from '@emotion/css'

interface ResponseTabProps {
  value?: ApiDetails['responses']
  onChange?: (value: ResponseTabProps['value']) => void
  defaultActiveResTabKey?: string
}

export function ResponseTab(props: ResponseTabProps) {
  const { value, onChange, defaultActiveResTabKey } = props

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

  const [modalOpen, setModalOpen] = useState(false)
  const [activeResTabKey, setActiveResTabKey] = useState(defaultActiveResTabKey)

  return (
    <>
      <Tabs
        activeKey={activeResTabKey}
        animated={false}
        className={styles.tabWithBorder}
        items={value?.map((resp, idx) => {
          const onlyOneRes = value.length === 1

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
                          const newResponses = value.filter((_, i) => i !== idx)

                          onChange?.(newResponses)

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
                            const targetIdx = examples?.findIndex((itt) => itt.id === it.id)

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

      <ModalNewResponse
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false)
        }}
        onFinish={(values) => {
          setModalOpen(false)

          const newResId = nanoid(6)

          onChange?.([...(value || []), { ...values, id: newResId }])

          setActiveResTabKey(newResId)
        }}
      />
    </>
  )
}

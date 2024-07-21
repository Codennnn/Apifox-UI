import { useEffect, useMemo, useState } from 'react'

import { Button, Form, Popconfirm, Space, theme } from 'antd'
import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu'
import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { InputUnderline } from '@/components/InputUnderline'
import { JsonSchemaCard } from '@/components/JsonSchemaCard'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { initialCreateApiSchemaData } from '@/data/remote'
import { MenuItemType } from '@/enums'
import type { ApiSchema } from '@/types'

type ApiSchemaForm = ApiSchema & { name?: ApiMenuData['name'] }

export function Schema() {
  const { token } = theme.useToken()

  const [form] = Form.useForm<ApiSchemaForm>()

  const { messageApi } = useGlobalContext()
  const { menuRawList, addMenuItem, updateMenuItem, removeMenuItem } = useMenuHelpersContext()
  const { addTabItem, removeTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()

  const [schemaName, setSchemaName] = useState<ApiMenuData['name']>()

  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create

  const fieldsValue = useMemo<ApiSchemaForm | undefined>(() => {
    if (isCreating) {
      return initialCreateApiSchemaData
    } else {
      if (menuRawList) {
        const menuData = menuRawList.find(({ id }) => id === tabData.key)

        if (menuData && menuData.type === MenuItemType.ApiSchema) {
          const apiSchema = menuData.data

          if (apiSchema) {
            return { ...apiSchema, name: menuData.name }
          }
        }
      }
    }
  }, [menuRawList, isCreating, tabData.key])

  useEffect(() => {
    if (fieldsValue) {
      setSchemaName(fieldsValue.name)
      form.setFieldsValue(fieldsValue)
    }
  }, [form, fieldsValue])

  return (
    <div className="p-tabContent">
      <Form
        form={form}
        onFinish={(values) => {
          const menuName = values.name || '未命名数据模型'

          if (isCreating) {
            const menuItemId = nanoid(6)

            addMenuItem({
              id: menuItemId,
              name: menuName,
              type: MenuItemType.ApiSchema,
              data: values,
            })

            addTabItem(
              {
                key: menuItemId,
                label: menuName,
                contentType: MenuItemType.ApiSchema,
              },
              { replaceTab: tabData.key }
            )
          } else {
            updateMenuItem({
              id: tabData.key,
              name: menuName,
              data: values,
            })

            messageApi.success('保存成功')
          }
        }}
        onValuesChange={(changedValues: ApiSchemaForm) => {
          if (changedValues.name) {
            setSchemaName(changedValues.name)
          }
        }}
      >
        <div className="mb-3 flex items-center" style={{ gap: `${token.padding}px` }}>
          <Form.Item noStyle name="name">
            <InputUnderline placeholder="数据模型名称，建议使用代码模型名称或同义词" />
          </Form.Item>

          <Space>
            <Button htmlType="submit" type="primary">
              保存
            </Button>

            {!isCreating && (
              <Popconfirm
                placement="bottom"
                title={`确定删除数据模型“${schemaName || ''}”？`}
                onConfirm={() => {
                  removeTabItem({ key: tabData.key })
                  removeMenuItem({ id: tabData.key })
                }}
              >
                <Button>删除</Button>
              </Popconfirm>
            )}
          </Space>
        </div>

        <Form.Item noStyle name="jsonSchema">
          <JsonSchemaCard editorProps={{ defaultExpandAll: true }} />
        </Form.Item>
      </Form>
    </div>
  )
}

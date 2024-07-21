import { useEffect, useMemo } from 'react'

import { Button, Form, Input } from 'antd'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { SelectorCatalog } from '@/components/SelectorCatalog'
import { SelectorService } from '@/components/SelectorService'
import { ROOT_CATALOG, SERVER_INHERIT } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { MenuItemType } from '@/enums'
import type { ApiFolder } from '@/types'

export function FolderSetting() {
  const { menuRawList, updateMenuItem } = useMenuHelpersContext()
  const { tabData } = useTabContentContext()

  const [form] = Form.useForm<ApiFolder>()

  const apiFolder = useMemo(() => {
    if (menuRawList) {
      return menuRawList.find(({ id }) => id === tabData.key)
    }
  }, [menuRawList, tabData.key])

  useEffect(() => {
    if (apiFolder && apiFolder.type === MenuItemType.ApiDetailFolder) {
      form.setFieldsValue({
        name: apiFolder.name,
        parentId: apiFolder.parentId || ROOT_CATALOG,
        serverId: apiFolder.data?.serverId || SERVER_INHERIT,
        description: apiFolder.data?.description,
      })
    }
  }, [form, apiFolder])

  return (
    <div className="max-w-2xl">
      <Form
        colon={false}
        form={form}
        labelCol={{ span: 6 }}
        onFinish={(values) => {
          if (apiFolder) {
            updateMenuItem({ ...values, id: apiFolder.id })
          }
        }}
      >
        <Form.Item
          label="目录名称"
          name="name"
          rules={[{ required: true, message: '目录名称不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="父级目录" name="parentId" required={false} rules={[{ required: true }]}>
          <SelectorCatalog
            exclued={apiFolder?.id ? [apiFolder.id] : undefined}
            type={MenuItemType.ApiDetailFolder}
          />
        </Form.Item>

        <Form.Item
          label="服务（前置URL）"
          name="serverId"
          tooltip="指定服务后，该目录下的所有接口，运行时都会使用该服务对应的 “前置 URL”（在环境里设置）。"
        >
          <SelectorService />
        </Form.Item>

        <Form.Item label="备注" name="description">
          <Input.TextArea placeholder="如需展示在发布的文档中，请在“文档” Tab 里编辑" rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

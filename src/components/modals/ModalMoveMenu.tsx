import { useEffect } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Form, Input, Modal, type ModalProps } from 'antd'

import type { ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import { SelectorCatalog } from '@/components/SelectorCatalog'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { MenuItemType } from '@/enums'

interface ModalMoveMenuProps extends Omit<ModalProps, 'open' | 'onOk'> {
  menuItemType?: MenuItemType
  formData?: Pick<ApiMenuData, 'id' | 'parentId'>
}

type FormData = Pick<ApiMenuData, 'id' | 'parentId'>

export const ModalMoveMenu = create(({ menuItemType, formData, ...props }: ModalMoveMenuProps) => {
  const modal = useModal()

  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
    }
  }, [form, formData])

  const { updateMenuItem } = useMenuHelpersContext()

  const handleHide = () => {
    form.resetFields()
    void modal.hide()
  }

  return (
    <Modal
      title="移动到..."
      {...props}
      open={modal.visible}
      onCancel={(...parmas) => {
        props.onCancel?.(...parmas)
        handleHide()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          updateMenuItem(values)
          handleHide()
        })
      }}
    >
      <Form<FormData> form={form} layout="vertical">
        <Form.Item hidden noStyle name="id" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="目标目录" name="parentId" rules={[{ required: true }]}>
          <SelectorCatalog
            placeholder="移动到..."
            type={
              menuItemType === MenuItemType.ApiDetail
                ? MenuItemType.ApiDetailFolder
                : menuItemType === MenuItemType.ApiSchema
                  ? MenuItemType.ApiSchemaFolder
                  : menuItemType
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  )
})

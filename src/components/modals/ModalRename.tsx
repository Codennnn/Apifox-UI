import { useEffect, useRef } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Form, Input, type InputRef, Modal, type ModalProps } from 'antd'

import type { ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'

interface ModalRenameProps extends Omit<ModalProps, 'open' | 'onOk'> {
  formData?: Pick<ApiMenuData, 'id' | 'name'>
}

type FormData = Pick<ApiMenuData, 'id' | 'name'>

export const ModalRename = create(({ formData, ...props }: ModalRenameProps) => {
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

  const inputRef = useRef<InputRef>(null)

  return (
    <Modal
      title="重命名"
      {...props}
      afterOpenChange={(...parmas) => {
        props.afterOpenChange?.(...parmas)

        const opened = parmas.at(0)

        if (opened) {
          inputRef.current?.select()
        }
      }}
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

        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input ref={inputRef} />
        </Form.Item>
      </Form>
    </Modal>
  )
})

import { useEffect, useRef } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import { Form, Input, type InputRef, Modal, type ModalProps } from 'antd'
import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import { SelectorCatalog } from '@/components/SelectorCatalog'
import { ROOT_CATALOG } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'

interface ModalNewCatalogProps extends Omit<ModalProps, 'open' | 'onOk'> {
  formData?: Pick<ApiMenuData, 'parentId' | 'type'>
}

type FormData = Pick<ApiMenuData, 'name' | 'parentId' | 'type'>

export const ModalNewCatalog = create(({ formData, ...props }: ModalNewCatalogProps) => {
  const modal = useModal()

  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue(formData)
    }
  }, [form, formData])

  const { addMenuItem } = useMenuHelpersContext()

  const handleHide = () => {
    form.resetFields()
    void modal.hide()
  }

  const inputRef = useRef<InputRef>(null)

  return (
    <Modal
      title="新建目录"
      width={400}
      {...props}
      afterOpenChange={(...parmas) => {
        props.afterOpenChange?.(...parmas)

        const opened = parmas.at(0)

        if (opened) {
          inputRef.current?.focus()
        }
      }}
      open={modal.visible}
      onCancel={(...parmas) => {
        props.onCancel?.(...parmas)
        handleHide()
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          addMenuItem({
            ...values,
            id: nanoid(6),
            parentId: values.parentId === ROOT_CATALOG ? undefined : values.parentId,
          })
          handleHide()
        })
      }}
    >
      <Form<FormData>
        form={form}
        initialValues={{
          parentId: ROOT_CATALOG,
        }}
        layout="vertical"
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input ref={inputRef} />
        </Form.Item>

        <Form.Item label="父级目录" name="parentId" required={false} rules={[{ required: true }]}>
          <SelectorCatalog hideCreateNew type={formData?.type} />
        </Form.Item>

        <Form.Item hidden name="type" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
})

import { useEffect, useMemo, useRef } from 'react'

import { create, useModal } from '@ebay/nice-modal-react'
import {
  Cascader,
  type CascaderProps,
  Form,
  Input,
  type InputRef,
  Modal,
  type ModalProps,
} from 'antd'
import { nanoid } from 'nanoid'

import type { ApiMenuData } from '@/components/ApiMenu/ApiMenu.type'
import { useGlobalContext } from '@/contexts/global'
import { isMenuFolder } from '@/utils'

const ROOT_CATALOG = 'xx'

interface NewCatalogModalProps extends Omit<ModalProps, 'open' | 'onOk'> {
  formData?: Pick<ApiMenuData, 'parentId' | 'type'>
}

type FormData = Pick<ApiMenuData, 'name' | 'parentId' | 'type'>

export const NewCatalogModal = create(({ formData, ...props }: NewCatalogModalProps) => {
  const modal = useModal()

  const { menuRawList } = useGlobalContext()

  const catalogOptions = useMemo<CascaderProps['options']>(() => {
    if (formData) {
      const menuList = menuRawList
        ?.filter((it) => it.type === formData.type && isMenuFolder(it.type))
        .map((it) => {
          return {
            value: it.id,
            label: it.name,
          }
        })

      return [
        {
          value: ROOT_CATALOG,
          label: '根目录',
        },
        ...(menuList || []),
      ]
    }
  }, [menuRawList, formData])

  const [form] = Form.useForm<FormData>()

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({ ...formData, parentId: formData.parentId ?? ROOT_CATALOG })
    }
  }, [form, formData])

  const { addMenuItem } = useGlobalContext()

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

        if (parmas.at(0)) {
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
            id: nanoid(),
            parentId: values.parentId === ROOT_CATALOG ? undefined : values.parentId,
          })
          handleHide()
        })
      }}
    >
      <Form
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
          <Cascader expandTrigger="hover" options={catalogOptions} />
        </Form.Item>

        <Form.Item hidden name="type" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
})

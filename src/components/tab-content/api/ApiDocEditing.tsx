import { useEffect, useRef } from 'react'

import { Button, Form, type FormProps, Select, type SelectProps, Space } from 'antd'
import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { InputUnderline } from '@/components/InputUnderline'
import { ApiRemoveButton } from '@/components/tab-content/api/ApiRemoveButton'
import { ResponseTab } from '@/components/tab-content/api/components/ResponseTab'
import { HTTP_METHOD_CONFIG } from '@/configs/static'
import { useGlobalContext } from '@/contexts/global'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { initialCreateApiDetailsData } from '@/data/remote'
import { MenuItemType, ParamType } from '@/enums'
import type { ApiDetails } from '@/types'

import { BaseFormItems } from './components/BaseFormItems'
import { GroupTitle } from './components/GroupTitle'
import { PathInput, type PathInputProps } from './components/PathInput'
import { ParamsTab } from './params/ParamsTab'

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

/**
 * API 「修改文档」部分。
 */
export function ApiDocEditing() {
  const [form] = Form.useForm<ApiDetails>()

  const { messageApi } = useGlobalContext()
  const msgKey = useRef<string>()

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

  const handlePathChange: PathInputProps['onValueChange'] = (pathVal) => {
    if (typeof pathVal === 'string') {
      // 匹配任意数量的 { 包围的路径参数。
      const regex = /\{+([^{}/]+)\}+/g
      let match: RegExpExecArray | null
      const pathParams: string[] = []

      // 使用 exec 迭代匹配。
      while ((match = regex.exec(pathVal)) !== null) {
        // match[1] 匹配 {} 包围的参数。
        const param = match[1]

        if (param) {
          pathParams.push(param)
        }
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

  const handleParseQueryParams: PathInputProps['onParseQueryParams'] = (parsedParams) => {
    if (Array.isArray(parsedParams)) {
      type Param = NonNullable<ApiDetails['parameters']>['query']

      const currentParmas = form.getFieldValue(['parameters', 'query']) as Param

      let newQueryParmas: Param = parsedParams

      if (Array.isArray(currentParmas)) {
        newQueryParmas = parsedParams.reduce((acc, item) => {
          const target = acc.find(({ name }) => name === item.name)

          if (!target) {
            acc.push(item)
          }

          return acc
        }, currentParmas)
      }

      form.setFieldValue(['parameters', 'query'], newQueryParmas)

      if (!msgKey.current) {
        msgKey.current = '__'
      }

      messageApi.info({
        key: msgKey.current,
        content: (
          <span>
            路径中&nbsp;Query&nbsp;参数已自动提取，并填充到下方<strong>请求参数</strong>的&nbsp;
            <strong>Param</strong>&nbsp;中
          </span>
        ),
        duration: 3,
        onClose: () => {
          msgKey.current = undefined
        },
      })
    }
  }

  return (
    <Form<ApiDetails>
      className="flex h-full flex-col"
      form={form}
      onFinish={(values) => {
        handleFinish(values)
      }}
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
            <PathInput
              onParseQueryParams={handleParseQueryParams}
              onValueChange={handlePathChange}
            />
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
        <Form.Item noStyle name="responses">
          <ResponseTab />
        </Form.Item>
      </div>
    </Form>
  )
}

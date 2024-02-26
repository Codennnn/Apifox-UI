import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import type { ApiTabItem } from '@/components/ApiTab/ApiTab.type'
import { apiMenuConfig } from '@/configs/static'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { CatalogType, MenuItemType } from '@/enums'

export function useHelpers() {
  const { addTabItem } = useMenuTabHelpers()

  const createApiDetails = (
    payload?: Partial<ApiTabItem>,
    config?: { autoActive?: boolean; replaceTab?: ApiTabItem['key'] }
  ) => {
    const { newLabel } = apiMenuConfig[CatalogType.Http]

    addTabItem(
      {
        ...payload,
        key: nanoid(4),
        label: newLabel,
        contentType: MenuItemType.ApiDetail,
        data: { tabStatus: PageTabStatus.Create },
      },
      config
    )
  }

  const createApiRequest = (
    payload?: Partial<ApiTabItem>,
    config?: { autoActive?: boolean; replaceTab?: ApiTabItem['key'] }
  ) => {
    const { newLabel } = apiMenuConfig[CatalogType.Request]

    addTabItem(
      {
        ...payload,
        key: nanoid(4),
        label: newLabel,
        contentType: MenuItemType.HttpRequest,
        data: { tabStatus: PageTabStatus.Create },
      },
      config
    )
  }

  const createDoc = (
    payload?: Partial<ApiTabItem>,
    config?: { autoActive?: boolean; replaceTab?: ApiTabItem['key'] }
  ) => {
    addTabItem(
      {
        ...payload,
        key: nanoid(4),
        label: '新建文档',
        contentType: MenuItemType.Doc,
        data: { tabStatus: PageTabStatus.Create },
      },
      config
    )
  }

  const createApiSchema = (
    payload?: Partial<ApiTabItem>,
    config?: { autoActive?: boolean; replaceTab?: ApiTabItem['key'] }
  ) => {
    const { newLabel } = apiMenuConfig[CatalogType.Schema]

    addTabItem(
      {
        ...payload,
        key: nanoid(4),
        label: newLabel,
        contentType: MenuItemType.ApiSchema,
        data: { tabStatus: PageTabStatus.Create },
      },
      config
    )
  }

  return {
    createApiDetails,
    createApiRequest,
    createDoc,
    createApiSchema,

    createTabItem: (t: MenuItemType) => {
      switch (t) {
        case MenuItemType.ApiDetail:
          createApiDetails()
          break

        case MenuItemType.HttpRequest:
          createApiRequest()
          break

        case MenuItemType.Doc:
          createDoc()
          break

        case MenuItemType.ApiSchema:
          createApiSchema()
          break
      }
    },
  }
}

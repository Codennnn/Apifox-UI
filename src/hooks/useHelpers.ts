import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import type { ApiTabItem } from '@/components/ApiTab/ApiTab.type'
import { API_MENU_CONFIG } from '@/configs/static'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { CatalogType, MenuItemType } from '@/enums'

export function useHelpers() {
  const { addTabItem } = useMenuTabHelpers()

  const createApiDetails = (
    payload?: Partial<ApiTabItem>,
    config?: { autoActive?: boolean; replaceTab?: ApiTabItem['key'] }
  ) => {
    const { newLabel } = API_MENU_CONFIG[CatalogType.Http]

    addTabItem(
      {
        ...payload,
        key: nanoid(6),
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
    const { newLabel } = API_MENU_CONFIG[CatalogType.Request]

    addTabItem(
      {
        ...payload,
        key: nanoid(6),
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
        key: nanoid(6),
        label: '新建 Markdown',
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
    const { newLabel } = API_MENU_CONFIG[CatalogType.Schema]

    addTabItem(
      {
        ...payload,
        key: nanoid(6),
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

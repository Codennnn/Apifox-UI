import { useMemo } from 'react'

import type { CascaderProps } from 'antd'
import arrayToTree from 'array-to-tree'

import type { ApiMenuData } from '@/components/ApiMenu'
import { ROOT_CATALOG } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import type { MenuItemType } from '@/enums'
import { isMenuFolder } from '@/helpers'

interface CatalogOption {
  value: string
  label: string
  disabled?: boolean
  children?: CatalogOption[]
}

type CascaderOptions = CascaderProps<CatalogOption>['options']

export interface UseCatalogParmas {
  type?: MenuItemType
  exclued?: ApiMenuData['id'][]
}

export function useCatalog({ type, exclued }: UseCatalogParmas): {
  catalogOptions: CascaderOptions
} {
  const { menuRawList } = useMenuHelpersContext()

  const catalogOptions = useMemo<CascaderOptions>(() => {
    const menuList = menuRawList
      ?.filter((it) => it.type === type && isMenuFolder(it.type))
      .map((it) => {
        return {
          value: it.id,
          label: it.name,
          disabled: exclued?.includes(it.id),
          parentId: it.parentId,
        }
      })

    return [
      {
        value: ROOT_CATALOG,
        label: '根目录',
      },
      ...(Array.isArray(menuList)
        ? arrayToTree(menuList, { customID: 'value', parentProperty: 'parentId' })
        : []),
    ]
  }, [menuRawList, type, exclued])

  return { catalogOptions }
}

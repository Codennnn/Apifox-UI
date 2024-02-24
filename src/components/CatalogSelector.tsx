import { useMemo } from 'react'

import { show } from '@ebay/nice-modal-react'
import { Cascader, Divider, theme } from 'antd'

import type { ApiMenuBase } from '@/components/ApiMenu/ApiMenu.type'
import { NewCatalogModal } from '@/components/modals/NewCatalogModal'
import { useGlobalContext } from '@/contexts/global'
import { findFolders } from '@/helpers'
import { ROOT_CATALOG, useCatalog, type UseCatalogParmas } from '@/hooks/useCatalog'

interface CatalogSelectorProps extends UseCatalogParmas {
  value?: ApiMenuBase['parentId']
  onChange?: (value: CatalogSelectorProps['value']) => void
  hideCreateNew?: boolean
}

export function CatalogSelector(props: CatalogSelectorProps) {
  const { token } = theme.useToken()

  const { value, onChange, type, exclued, hideCreateNew } = props

  const { menuRawList } = useGlobalContext()
  const { catalogOptions } = useCatalog({ type, exclued })

  const internalValue = useMemo(() => {
    if (menuRawList && value) {
      const group = findFolders(menuRawList, [], value).map(({ id }) => id)
      return group.length > 0 ? group : [ROOT_CATALOG]
    }
  }, [value, menuRawList])

  return (
    <Cascader
      showSearch
      allowClear={false}
      dropdownRender={
        hideCreateNew
          ? void 0
          : (menus) => {
              return (
                <>
                  {menus}

                  <Divider style={{ margin: 0 }} />

                  <div
                    className="inline-flex cursor-pointer p-2"
                    style={{
                      color: token.colorPrimary,
                    }}
                    onClick={() => {
                      void show(NewCatalogModal)
                    }}
                  >
                    新建目录
                  </div>
                </>
              )
            }
      }
      expandTrigger="hover"
      options={catalogOptions}
      value={internalValue}
      onChange={(val) => {
        const lastOne = val.at(-1)

        if (typeof lastOne === 'string') {
          onChange?.(lastOne)
        }
      }}
    />
  )
}

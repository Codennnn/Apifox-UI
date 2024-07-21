import { useMemo } from 'react'

import { show } from '@ebay/nice-modal-react'
import { Cascader, type CascaderProps, Divider, theme } from 'antd'

import type { ApiMenuBase } from '@/components/ApiMenu/ApiMenu.type'
import { ModalNewCatalog } from '@/components/modals/ModalNewCatalog'
import { ROOT_CATALOG } from '@/configs/static'
import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { findFolders } from '@/helpers'
import { useCatalog, type UseCatalogParmas } from '@/hooks/useCatalog'

interface SelectorCatalogProps extends UseCatalogParmas, Pick<CascaderProps, 'placeholder'> {
  value?: ApiMenuBase['parentId']
  onChange?: (value: SelectorCatalogProps['value']) => void
  hideCreateNew?: boolean
}

export function SelectorCatalog(props: SelectorCatalogProps) {
  const { token } = theme.useToken()

  const { value, onChange, type, exclued, hideCreateNew, ...rest } = props

  const { menuRawList } = useMenuHelpersContext()
  const { catalogOptions } = useCatalog({ type, exclued })

  const internalValue = useMemo(() => {
    if (menuRawList && value) {
      const group = findFolders(menuRawList, [], value).map(({ id }) => id)
      return group.length > 0 ? group : [ROOT_CATALOG]
    }
  }, [value, menuRawList])

  return (
    <Cascader
      {...rest}
      showSearch
      allowClear={false}
      dropdownRender={
        hideCreateNew
          ? undefined
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
                      if (type) {
                        void show(ModalNewCatalog, {
                          formData: {
                            parentId: ROOT_CATALOG,
                            type: type,
                          },
                          zIndex: Infinity, // <- 防止层级被覆盖。
                        })
                      }
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
      onChange={(val: unknown[]) => {
        const lastOne = val.at(-1)

        if (typeof lastOne === 'string') {
          onChange?.(lastOne)
        }
      }}
    />
  )
}

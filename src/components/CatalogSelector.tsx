import { useMemo } from 'react'

import { Cascader } from 'antd'

import type { ApiMenuBase } from '@/components/ApiMenu/ApiMenu.type'
import { useGlobalContext } from '@/contexts/global'
import { ROOT_CATALOG, useCatalog, type UseCatalogParmas } from '@/hooks/useCatalog'
import { findGroup } from '@/utils'

interface CatalogSelectorProps extends UseCatalogParmas {
  value?: ApiMenuBase['parentId']
  onChange?: (value: CatalogSelectorProps['value']) => void
}

export function CatalogSelector(props: CatalogSelectorProps) {
  const { value, onChange, type, exclued } = props

  const { menuRawList } = useGlobalContext()
  const { catalogOptions } = useCatalog({ type, exclued })

  const internalValue = useMemo(() => {
    if (menuRawList && value) {
      const group = findGroup(menuRawList, [], value).map(({ id }) => id)
      return group.length > 0 ? group : [ROOT_CATALOG]
    }
  }, [value, menuRawList])

  return (
    <Cascader
      showSearch
      allowClear={false}
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

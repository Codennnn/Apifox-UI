import { useMemo } from 'react'

import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { useGlobalContext } from '@/contexts/global'
import type { ApiDoc } from '@/types'

export function Doc() {
  const { menuRawList } = useGlobalContext()
  const { tabData } = useTabContentContext()

  const { docValue } = useMemo(() => {
    const apiDocValue = menuRawList?.find(({ id }) => id === tabData.key)?.data as
      | ApiDoc
      | undefined

    return { docValue: apiDocValue }
  }, [menuRawList, tabData.key])

  if (docValue) {
    return (
      <div>
        <div>
          <span>{docValue.name}</span>
        </div>

        <div>{docValue.content}</div>
      </div>
    )
  }

  return null
}

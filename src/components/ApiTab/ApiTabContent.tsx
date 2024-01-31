import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { Api } from '@/components/tab-content/api/Api'
import { Blank } from '@/components/tab-content/Blank'
import { CatalogType } from '@/enums'

/**
 * 渲染页签内容。
 *
 * - 不同类型的页签渲染的内容不同。
 * - 相同类型的页签可能会有不同的状态，比如：新增、编辑。
 */
export function ApiTabContent() {
  const { tabData } = useTabContentContext()

  switch (tabData.contentType) {
    case CatalogType.Http:
      return <Api />

    case CatalogType.Schema:
      return null

    case 'blank':
      return <Blank />

    default:
      return null
  }
}

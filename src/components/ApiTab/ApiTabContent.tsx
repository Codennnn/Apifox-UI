import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { Api } from '@/components/tab-content/api/Api'
import { Blank } from '@/components/tab-content/Blank'
import { Doc } from '@/components/tab-content/Doc'
import { Schema } from '@/components/tab-content/Schema'
import { MenuItemType } from '@/enums'

/**
 * 渲染页签内容。
 *
 * - 不同类型的页签渲染的内容不同。
 * - 相同类型的页签可能会有不同的状态，比如：新增、编辑。
 */
export function ApiTabContent() {
  const { tabData } = useTabContentContext()

  switch (tabData.contentType) {
    case MenuItemType.ApiDetail:
      return <Api />

    case MenuItemType.ApiSchema:
      return <Schema />

    case MenuItemType.Doc:
      return <Doc />

    case 'blank':
      return <Blank />

    default:
      return null
  }
}

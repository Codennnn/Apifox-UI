import { ApiTabContentWrapper } from '@/components/ApiTab/ApiTabContentWrapper'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { Api } from '@/components/tab-content/api/Api'
import { ApiDocEditing } from '@/components/tab-content/api/ApiDocEditing'
import { Blank } from '@/components/tab-content/Blank'
import { Doc } from '@/components/tab-content/Doc'
import { Folder } from '@/components/tab-content/folder/Folder'
import { Overview } from '@/components/tab-content/Overview'
import { Recycle } from '@/components/tab-content/Recycle'
import { Schema } from '@/components/tab-content/Schema'
import { CatalogType, MenuItemType } from '@/enums'

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

    case MenuItemType.HttpRequest:
      return (
        <ApiTabContentWrapper>
          <ApiDocEditing />
        </ApiTabContentWrapper>
      )

    case MenuItemType.ApiSchema:
      return <Schema />

    case MenuItemType.ApiDetailFolder:
    case MenuItemType.ApiSchemaFolder:
      return <Folder />

    case MenuItemType.Doc:
      return <Doc />

    case CatalogType.Overview:
      return <Overview />

    case CatalogType.Recycle:
      return <Recycle />

    case 'blank':
      return <Blank />

    default:
      return null
  }
}

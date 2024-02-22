import useEvent from 'react-use-event-hook'

import { ConfigProvider, theme, Tree, type TreeProps } from 'antd'

import { apiMenuConfig } from '@/configs/static'
import { CatalogType, MenuItemType } from '@/enums'
import { useStyles } from '@/hooks/useStyle'

import { useMenuTabContext, useMenuTabHelpers } from '../../contexts/menu-tab-settings'
import { PageTabStatus } from '../ApiTab/ApiTab.enum'

import type { CatalogDataNode } from './ApiMenu.type'
import { useApiMenuContext } from './ApiMenuContext'
import { SwitcherIcon } from './SwitcherIcon'

import { css } from '@emotion/css'

type TreeOnSelect = NonNullable<TreeProps['onSelect']>

/**
 * 侧边的菜单目录，以文件树的形式展示。
 *
 * 相关概念：
 * - 名词解释：菜单/目录（Menu），文件夹（Folder），文件（File），Folder 和 File 统称为 Menu。
 * - 文件夹可以包含文件和另一个文件夹，包含的关系以层级递进的形式展示。
 */
export function ApiMenu() {
  const { token } = theme.useToken()

  const { expandedMenuKeys, addExpandedMenuKeys, removeExpandedMenuKeys, menuTree } =
    useApiMenuContext()

  const { tabItems, activeTabKey } = useMenuTabContext()
  const { activeTabItem, addTabItem } = useMenuTabHelpers()

  const selectedKeys = activeTabKey ? [activeTabKey] : undefined

  const switchExpandedKeys = useEvent((menuId: string) => {
    if (expandedMenuKeys.includes(menuId)) {
      removeExpandedMenuKeys([menuId])
    } else {
      addExpandedMenuKeys([menuId])
    }
  })

  const handleMenuSelect = useEvent<TreeOnSelect>((_, { node }) => {
    const menuId = node.key

    if (typeof menuId === 'string') {
      if (!node.isLeaf) {
        switchExpandedKeys(menuId)
      }

      const isTabPresent = tabItems.some(({ key }) => key === menuId)

      if (isTabPresent) {
        activeTabItem({ key: menuId })
      } else {
        if (menuId === CatalogType.Overview || menuId === CatalogType.Recycle) {
          const { title } = apiMenuConfig[menuId]

          addTabItem({
            key: menuId,
            label: title,
            contentType: menuId,
          })
        } else {
          if ('customData' in node) {
            const dataNode = node as CatalogDataNode
            const catalog = dataNode.customData.catalog

            if (
              catalog.type !== MenuItemType.ApiSchemaFolder &&
              catalog.type !== MenuItemType.RequestFolder
            ) {
              addTabItem({
                key: menuId,
                label: catalog.name,
                contentType: catalog.type,
                data: {
                  tabStatus: PageTabStatus.Update,
                },
              })
            }
          }
        }
      }
    }
  })

  const { styles } = useStyles(({ token }) => ({
    menuTree: css({
      '.ant-tree-treenode': {
        '::before': {
          borderRadius: token.borderRadiusSM,
        },

        ':hover': {
          '.app-menu-controls': {
            display: 'inline-flex',
          },
        },
      },
    }),
  }))

  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            motionDurationMid: '0',
            motionDurationSlow: '0',
            colorBgTextHover: 'transparent',
            colorBgContainer: 'transparent',
            colorPrimary: token.colorFillTertiary,
            colorTextLightSolid: 'currentColor',
          },
        },
      }}
    >
      {!!menuTree && (
        <Tree.DirectoryTree
          showIcon
          draggable={false}
          expandedKeys={expandedMenuKeys}
          rootClassName={styles.menuTree}
          selectedKeys={selectedKeys}
          switcherIcon={
            ((node) => {
              const hasChildren = node.data?.children?.length
              return hasChildren ? (
                <SwitcherIcon
                  onClick={() => {
                    const menuId = node.data?.key

                    if (typeof menuId === 'string') {
                      switchExpandedKeys(menuId)
                    }
                  }}
                />
              ) : null
            }) as CatalogDataNode['switcherIcon']
          }
          treeData={menuTree}
          onSelect={handleMenuSelect}
        />
      )}
    </ConfigProvider>
  )
}

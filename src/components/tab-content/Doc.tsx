import { useEffect, useMemo, useState } from 'react'

import gfm from '@bytemd/plugin-gfm'
import { Editor, Viewer } from '@bytemd/react'
import { Button, Space, theme } from 'antd'
import { nanoid } from 'nanoid'

import { PageTabStatus } from '@/components/ApiTab/ApiTab.enum'
import { useTabContentContext } from '@/components/ApiTab/TabContentContext'
import { InputUnderline } from '@/components/InputUnderline'
import { useGlobalContext } from '@/contexts/global'
import { useMenuTabHelpers } from '@/contexts/menu-tab-settings'
import { MenuItemType } from '@/enums'
import { useStyles } from '@/hooks/useStyle'
import type { ApiDoc } from '@/types'

// eslint-disable-next-line import/no-unresolved
import 'bytemd/dist/index.css'
import { css } from '@emotion/css'

const DEFAULT_DOC_NAME = '未命名文档'

const plugins = [gfm()]

export function Doc() {
  const { token } = theme.useToken()

  const { menuRawList, addMenuItem, updateMenuItem, messageApi } = useGlobalContext()
  const { addTabItem } = useMenuTabHelpers()
  const { tabData } = useTabContentContext()

  const { docValue } = useMemo(() => {
    const apiDocValue = menuRawList?.find(({ id }) => id === tabData.key)?.data as
      | ApiDoc
      | undefined

    return { docValue: apiDocValue }
  }, [menuRawList, tabData.key])

  const [name, setName] = useState<ApiDoc['name']>()
  const [content, setContent] = useState('')

  useEffect(() => {
    if (docValue) {
      setName(docValue.name)
      setContent(docValue.content || '')
    }
  }, [docValue])

  const isCreating = tabData.data?.tabStatus === PageTabStatus.Create
  const [editing, setEditing] = useState(true)
  // const [editing, setEditing] = useState(isCreating)

  const { styles } = useStyles(({ token }) => {
    const editor = css({
      '> div': {
        height: '100%',

        '.bytemd': {
          height: '100%',
          borderColor: token.colorBorderSecondary,
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: 'none',

          '.bytemd-toolbar': {
            backgroundColor: token.colorBgContainer,
            borderColor: token.colorBorderSecondary,

            '.bytemd-toolbar-icon': {
              color: token.colorTextSecondary,

              '&:hover': {
                backgroundColor: token.colorFillSecondary,
              },
            },
          },

          '.bytemd-preview': {
            borderColor: token.colorBorderSecondary,
          },

          '.bytemd-status': {
            borderColor: token.colorBorderSecondary,
          },
        },
      },
    })

    return {
      editor,
    }
  })

  if (editing) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center px-tabContent py-2" style={{ gap: `${token.padding}px` }}>
          <InputUnderline
            placeholder={DEFAULT_DOC_NAME}
            style={{ fontWeight: 'bold', fontSize: '18px' }}
            value={name}
            onChange={(ev) => {
              setName(ev.target.value)
            }}
          />

          <Space>
            {!isCreating && (
              <Button
                onClick={() => {
                  setEditing(false)
                }}
              >
                退出编辑
              </Button>
            )}

            <Button
              type="primary"
              onClick={() => {
                const values: ApiDoc = { id: nanoid(), name: name || DEFAULT_DOC_NAME, content }

                if (isCreating) {
                  const menuItemId = nanoid()

                  addMenuItem({
                    id: menuItemId,
                    name: name || DEFAULT_DOC_NAME,
                    type: MenuItemType.Doc,
                    data: values,
                  })

                  addTabItem(
                    {
                      key: menuItemId,
                      label: name,
                      contentType: MenuItemType.Doc,
                    },
                    { replaceTab: tabData.key }
                  )
                } else {
                  updateMenuItem({
                    id: tabData.key,
                    name: name,
                    data: values,
                  })

                  messageApi.success('已保存')
                }
              }}
            >
              保存
            </Button>
          </Space>
        </div>

        <div className={`flex-1 overflow-y-auto ${styles.editor}`}>
          <Editor
            locale={{
              bold: '粗体',
              boldText: '粗体文本',
              cheatsheet: 'Markdown 语法',
              closeHelp: '关闭帮助',
              closeToc: '关闭目录',
              code: '代码',
              codeBlock: '代码块',
              codeLang: '编程语言',
              codeText: '代码',
              exitFullscreen: '退出全屏',
              exitPreviewOnly: '恢复默认',
              exitWriteOnly: '恢复默认',
              fullscreen: '全屏',
              h1: '一级标题',
              h2: '二级标题',
              h3: '三级标题',
              h4: '四级标题',
              h5: '五级标题',
              h6: '六级标题',
              headingText: '标题',
              help: '帮助',
              hr: '分割线',
              image: '图片',
              imageAlt: 'alt',
              imageTitle: '图片描述',
              italic: '斜体',
              italicText: '斜体文本',
              limited: '已达最大字符数限制',
              lines: '行数',
              link: '链接',
              linkText: '链接描述',
              ol: '有序列表',
              olItem: '项目',
              preview: '预览',
              previewOnly: '仅预览区',
              quote: '引用',
              quotedText: '引用文本',
              shortcuts: '快捷键',
              source: '源代码',
              sync: '同步滚动',
              toc: '目录',
              top: '回到顶部',
              ul: '无序列表',
              ulItem: '项目',
              words: '字数',
              write: '编辑',
              writeOnly: '仅编辑区',
            }}
            plugins={plugins}
            value={content}
            onChange={(v) => {
              setContent(v)
            }}
          />
        </div>
      </div>
    )
  } else {
    return (
      <div className="mx-auto max-w-[1232px]">
        <div
          className="flex items-center"
          style={{
            padding: `${token.paddingXS}px 0`,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div className="flex-1 text-lg font-bold">{docValue?.name}</div>

          <Button
            onClick={() => {
              setEditing(true)
            }}
          >
            编辑
          </Button>
        </div>

        <Viewer value={docValue?.content || ''} />
      </div>
    )
  }
}

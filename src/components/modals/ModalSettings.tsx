import { useMemo, useState } from 'react'

import { Viewer } from '@bytemd/react'
import { create, useModal } from '@ebay/nice-modal-react'
import { ConfigProvider, Menu, type MenuProps, Modal, type ModalProps, theme } from 'antd'
import { InfoIcon, ShirtIcon } from 'lucide-react'

import { ThemeEditor, useThemeContext } from '@/components/ThemeEditor'

const enum SettingsMenuKey {
  Appearance = '0',
  About = '1',
}

const settingMenuItems = [
  {
    key: SettingsMenuKey.Appearance,
    icon: <ShirtIcon size={16} />,
    label: '外观',
  },
  {
    key: SettingsMenuKey.About,
    icon: <InfoIcon size={16} />,
    label: '关于此项目',
  },
] satisfies MenuProps['items']

function ThemeEditorWrapper() {
  const { themeSetting, setThemeSetting, autoSaveId } = useThemeContext()

  return (
    <ThemeEditor
      autoSaveId={autoSaveId}
      value={themeSetting}
      onChange={(value) => {
        if (value) {
          setThemeSetting(value)
        }
      }}
    />
  )
}

const renderMenuContent = (props: { menuKey: SettingsMenuKey }) => {
  switch (props.menuKey) {
    case SettingsMenuKey.Appearance:
      return <ThemeEditorWrapper />

    case SettingsMenuKey.About:
      return (
        <Viewer
          value={`## 介绍\n\n这是一个精心仿制 Apifox 界面的纯前端项目，使用 Next + Antd + TypeScript + TailwindCSS 开发，源码融入了很多好的编码实践，能让你学习到如何组织和建设一个复杂的 React 项目，非常适合 React 新手学习！\n\n## 动机\n\n在日常工作中，我经常会使用 Antd 来构建页面，但大多数页面的结构和交互都是比较简单的。为了精进对 Next + Antd 的使用技巧，我选择了 Apifox 这个相对复杂的界面进行模仿，希望在实践中能够掌握使用 Antd 打造出高级的页面效果。\n\n可能有很多小伙伴也抱有类似的学习动机，所以我将代码开源出来，希望能帮助各位，感兴趣的话不妨到点个 star⭐ 收藏一下噢~`}
        />
      )
  }
}

type ModalSettingsProps = Omit<ModalProps, 'open' | 'footer'>

export const ModalSettings = create((props: ModalSettingsProps) => {
  const { token } = theme.useToken()

  const modal = useModal()

  const [selectedKeys, setSelectedKeys] = useState<[SettingsMenuKey]>([SettingsMenuKey.Appearance])

  const selectedMenuItem = useMemo(() => {
    return settingMenuItems.find((item) => item.key === selectedKeys[0])
  }, [selectedKeys])

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            paddingMD: 0,
            paddingContentHorizontalLG: 0,
          },
        },
      }}
    >
      <Modal
        width={950}
        {...props}
        footer={false}
        open={modal.visible}
        onCancel={(...parmas) => {
          props.onCancel?.(...parmas)
          void modal.hide()
        }}
      >
        <div className="flex">
          <div
            className="w-64"
            style={{
              padding: `${token.paddingMD}px 0`,
              backgroundColor: token.colorFillQuaternary,
            }}
          >
            <div
              className="text-lg"
              style={{
                padding: `0 ${token.paddingMD}px ${token.paddingMD}px ${token.paddingMD}px`,
              }}
            >
              设置
            </div>

            <div style={{ padding: `0 ${token.paddingMD}px` }}>
              <ConfigProvider
                theme={{
                  components: {
                    Menu: {
                      colorBgContainer: 'transparent',
                      itemHoverBg: 'transparent',
                      itemHoverColor: token.colorPrimary,
                      itemBorderRadius: token.borderRadiusSM,
                    },
                  },
                }}
              >
                <Menu
                  className="!border-none"
                  items={settingMenuItems}
                  selectedKeys={selectedKeys}
                  onClick={({ key }) => {
                    setSelectedKeys([key as SettingsMenuKey])
                  }}
                />
              </ConfigProvider>
            </div>
          </div>

          <div className="flex-1" style={{ padding: `${token.paddingMD}px` }}>
            <div className="text-lg" style={{ padding: `0 0 ${token.paddingMD}px 0` }}>
              {selectedMenuItem?.label}
            </div>

            {renderMenuContent({ menuKey: selectedKeys[0] })}
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  )
})

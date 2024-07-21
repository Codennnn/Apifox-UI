'use client'

import { ConfigProvider, Menu, type MenuProps, Skeleton, theme } from 'antd'
import { LayersIcon, SettingsIcon } from 'lucide-react'

import { PanelLayout } from '../components/PanelLayout'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'g1',
    label: (
      <div className="flex items-center gap-2">
        <SettingsIcon size={16} />
        通用设置
      </div>
    ),
    type: 'group',
    children: [
      { key: '1', label: '基本设置' },
      {
        key: '2',
        label: '功能设置',
        children: [
          { key: '1x', label: '接口功能设置' },
          { key: '2x', label: '高级设置' },
        ],
      },
    ],
  },
  {
    key: 'g2',
    label: (
      <div className="flex items-center gap-2">
        <LayersIcon size={16} />
        项目资源
      </div>
    ),
    type: 'group',
    children: [
      { key: '3', label: '常用参数' },
      { key: '4', label: '公共响应' },
    ],
  },
]

export default function SettingsPage() {
  const { token } = theme.useToken()

  return (
    <PanelLayout
      layoutName="项目设置"
      left={
        <div>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  activeBarBorderWidth: 0,
                  itemHeight: 32,
                  itemSelectedBg: token.colorBgTextHover,
                  itemActiveBg: token.colorBgTextHover,
                  itemSelectedColor: token.colorText,
                },
              },
            }}
          >
            <Menu items={items} mode="inline" />
          </ConfigProvider>
        </div>
      }
      right={
        <div className="p-5">
          待实现的设置页
          <Skeleton />
          <Skeleton />
        </div>
      }
    />
  )
}

import { show } from '@ebay/nice-modal-react'
import { Button, Dropdown, Space } from 'antd'
import { GithubIcon, InfoIcon, SettingsIcon } from 'lucide-react'

import { IconLogo } from '@/components/icons/IconLogo'
import { ModalSettings, SettingsMenuKey } from '@/components/modals/ModalSettings'
import { GitHubRepo } from '@/constants'

const enum MenuKey {
  About = '0',
  Repo = '1',
}

export function HeaderNav() {
  return (
    <div className="flex h-full items-center">
      <div className="ml-auto">
        <Space size={4}>
          <Button
            icon={<SettingsIcon size={14} />}
            size="small"
            type="text"
            onClick={() => {
              void show(ModalSettings)
            }}
          />

          <Dropdown
            menu={{
              items: [
                {
                  key: MenuKey.About,
                  label: '关于项目',
                  icon: <InfoIcon size={16} />,
                },
                {
                  key: MenuKey.Repo,
                  label: '源码仓库',
                  icon: <GithubIcon size={16} />,
                },
              ],
              onClick: ({ key }) => {
                switch (key) {
                  case MenuKey.About:
                    void show(ModalSettings, { selectedKey: SettingsMenuKey.About })
                    break

                  case MenuKey.Repo:
                    window.open(GitHubRepo, '_blank')
                    break
                }
              },
            }}
          >
            <Button
              icon={
                <div className="inline-flex size-4 items-center justify-center">
                  <IconLogo />
                </div>
              }
              size="small"
              type="text"
            />
          </Dropdown>
        </Space>
      </div>
    </div>
  )
}

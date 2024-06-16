import { ConfigProvider, Input, type InputProps, theme } from 'antd'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

export function InputUnderline(props: InputProps) {
  const { token } = theme.useToken()

  const { styles } = useStyles(({ token }) => {
    return {
      nameInput: css({
        color: token.colorTextBase,
        borderBottom: '1px solid transparent',
        padding: `0 ${token.paddingXXS}px`,

        '&:hover': {
          borderColor: token.colorBorder,
        },

        '&:focus': {
          borderColor: token.colorPrimary,
        },
      }),
    }
  })

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: { borderRadiusLG: 0, paddingInlineLG: 0, paddingBlockLG: token.paddingXXS },
        },
      }}
    >
      <Input
        {...props}
        className={`font-semibold ${styles.nameInput} ${props.className || ''}`}
        size="large"
        variant="borderless"
      />
    </ConfigProvider>
  )
}

import { forwardRef } from 'react'

import { theme } from 'antd'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface MenuActionButtonProps extends React.ComponentProps<'span'> {
  icon?: React.ReactNode
}

export const MenuActionButton = forwardRef<any, MenuActionButtonProps>(
  function MenuActionButton(props, ref) {
    const { token } = theme.useToken()

    const { icon, className = '', style, ...restSpanProps } = props

    const { styles } = useStyles(({ token }) => ({
      icon: css({
        '&:hover': {
          backgroundColor: token.colorFillSecondary,
        },
      }),
    }))

    return (
      <span
        {...restSpanProps}
        ref={ref}
        className={`inline-flex h-full items-center p-[2px] px-1 ${className} ${styles.icon}`}
        style={{ ...style, borderRadius: token.borderRadiusXS }}
      >
        {icon}
      </span>
    )
  }
)

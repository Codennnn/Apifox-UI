import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface UIBtnProps extends React.PropsWithChildren, React.ComponentProps<'button'> {
  primary?: boolean
}

export function UIButton(props: UIBtnProps) {
  const { children, primary, className = '', ...rest } = props

  const { styles } = useStyles(({ token }) => ({
    btn: css({
      padding: `${token.paddingXXS}px ${token.paddingXS}px`,
      backgroundColor: primary ? token.colorPrimaryBg : token.colorFillTertiary,
      borderRadius: token.borderRadiusSM,
      color: primary ? token.colorPrimary : token.colorTextSecondary,

      '&:hover': {
        backgroundColor: primary ? token.colorPrimaryBg : token.colorFillSecondary,
      },
    }),
  }))

  return (
    <button
      type="button"
      {...rest}
      className={`cursor-pointer border-none text-xs outline-none ${styles.btn} ${className}`}
    >
      {children}
    </button>
  )
}

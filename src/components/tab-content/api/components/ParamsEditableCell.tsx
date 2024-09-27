import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface ParamsEditableCelllProps
  extends React.PropsWithChildren,
    Pick<React.ComponentProps<'div'>, 'className'> {}

export function ParamsEditableCell(props: ParamsEditableCelllProps) {
  const { children, className = '' } = props

  const { styles } = useStyles(({ token }) => {
    const editableCell = css({
      height: '100%',
      minHeight: '32px',

      '&:hover, &:focus-within': {
        outline: `1px solid ${token.colorPrimary}`,
        borderColor: 'transparent',
      },
    })

    return { editableCell }
  })

  return <div className={`${styles.editableCell} ${className}`}>{children}</div>
}

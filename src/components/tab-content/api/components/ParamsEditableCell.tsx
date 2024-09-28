import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface ParamsEditableCelllProps
  extends React.PropsWithChildren,
    Pick<React.ComponentProps<'div'>, 'className'> {
  validateError?: boolean
}

export function ParamsEditableCell(props: ParamsEditableCelllProps) {
  const { children, className = '', validateError } = props

  const { styles } = useStyles(({ token }) => {
    const editableCell = css({
      height: '100%',
      minHeight: '32px',
      outline: `1px solid`,
      outlineColor: validateError ? token.colorErrorText : 'transparent',

      '&:hover, &:focus-within': {
        outlineColor: validateError ? token.colorErrorText : token.colorPrimary,
        borderColor: 'transparent',
      },
    })

    return { editableCell }
  })

  return <div className={`flex items-center ${styles.editableCell} ${className}`}>{children}</div>
}

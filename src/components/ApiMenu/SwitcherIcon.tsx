import { ChevronDownIcon } from 'lucide-react'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

export function SwitcherIcon(props: Pick<React.ComponentProps<'span'>, 'onClick'>) {
  const { onClick } = props

  const { styles } = useStyles(({ token }) => ({
    icon: css({
      borderRadius: token.borderRadiusOuter,

      '&:hover': {
        backgroundColor: token.colorFillSecondary,
      },
    }),
  }))

  return (
    <span
      className={`ant-tree-switcher-icon !inline-flex size-4 items-center p-[2px] ${styles.icon}`}
      onClick={onClick}
    >
      <ChevronDownIcon size={10} />
    </span>
  )
}

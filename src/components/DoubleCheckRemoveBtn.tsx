import { useRef, useState } from 'react'

import { CircleMinusIcon, CircleXIcon } from 'lucide-react'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

interface DoubleCheckRemoveBtnProps extends React.ComponentProps<'span'> {
  onRemove?: () => void
}

/**
 * 双重确认删除按钮组件。
 *
 * 该组件提供了一个具有删除功能的按钮，需要用户二次确认才能执行删除操作。
 * 它通过不同的图标和状态提示用户删除操作的状态。
 */
export function DoubleCheckRemoveBtn(props: DoubleCheckRemoveBtnProps) {
  const { onRemove, ...restSpanProps } = props

  const { styles } = useStyles(({ token }) => {
    return {
      remove: css({
        color: token.colorTextTertiary,
        cursor: 'pointer',
      }),

      removeActive: css({
        color: token.colorError,
      }),
    }
  })

  const timeout = useRef<NodeJS.Timeout>()
  const isRemoveHover = useRef(false)
  const [isRemoveActive, setIsRemoveActive] = useState(false)

  const handleReset = () => {
    if (timeout.current) {
      window.clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      if (!isRemoveHover.current) {
        setIsRemoveActive(false)
      }
    }, 1000)
  }

  return (
    <span {...restSpanProps}>
      {isRemoveActive ? (
        <CircleXIcon
          className={`${styles.remove} ${styles.removeActive}`}
          size={13}
          onClick={() => {
            onRemove?.()
          }}
          onMouseLeave={() => {
            isRemoveHover.current = false
            handleReset()
          }}
          onMouseOver={() => {
            isRemoveHover.current = true
          }}
        />
      ) : (
        <CircleMinusIcon
          className={styles.remove}
          size={13}
          onClick={() => {
            setIsRemoveActive(true)
            handleReset()
          }}
        />
      )}
    </span>
  )
}

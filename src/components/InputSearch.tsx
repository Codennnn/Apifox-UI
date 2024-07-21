import { useCallback } from 'react'

import { Input } from 'antd'
import { useCompositionInput } from 'foxact/use-composition-input'
import { SearchIcon } from 'lucide-react'

import { useMenuHelpersContext } from '@/contexts/menu-helpers'
import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

export function InputSearch() {
  const { setMenuSearchWord } = useMenuHelpersContext()

  const inputProps = useCompositionInput(
    useCallback(
      (value) => {
        setMenuSearchWord?.(value)
      },
      [setMenuSearchWord]
    )
  )

  const { styles } = useStyles(({ token }) => {
    const inputBox = css({
      borderRadius: token.borderRadius,
      border: `1px solid ${token.colorBorderSecondary}`,

      '&:hover': {
        borderColor: token.colorPrimary,
      },
    })

    return {
      inputBox,
    }
  })

  return (
    <div className={`flex-1 overflow-hidden transition-colors ${styles.inputBox}`}>
      <Input {...inputProps} allowClear prefix={<SearchIcon size={14} />} variant="borderless" />
    </div>
  )
}

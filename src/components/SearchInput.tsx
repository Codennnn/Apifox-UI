import { Input } from 'antd'
import { SearchIcon } from 'lucide-react'

import { useStyles } from '@/hooks/useStyle'

import { css } from '@emotion/css'

export function SearchInput() {
  // const searchInputProps = useCompositionInput(
  //   useCallback((value: string) => {
  //     console.log(value)
  //   }, [])
  // )
  const { styles } = useStyles(({ token }) => {
    const inputBox = css({
      backgroundColor: token.colorFillTertiary,
      borderRadius: token.borderRadius,
      border: `1px solid ${token.colorFillTertiary}`,

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
      <Input
        prefix={<SearchIcon size={14} />}
        variant="borderless"
        //  {...searchInputProps}
      />
    </div>
  )
}

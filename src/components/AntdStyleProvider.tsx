'use client'

import { useState } from 'react'

import { useServerInsertedHTML } from 'next/navigation'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'

/**
 * 这部分的代码参考自：https://github.com/ant-design/ant-design/issues/38555#issuecomment-1571203559
 */
function AntdStyleRegister(props: React.PropsWithChildren) {
  const [cache] = useState(() => createCache())

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          // This is hack, `extractStyle` does not currently support returning JSX or related data.
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    )
  })

  return <StyleProvider cache={cache}>{props.children}</StyleProvider>
}

/**
 * 使用「服务端渲染」需要烘焙样式，否则会出现样式闪烁问题。
 *
 * - 相关文档：https://ant.design/docs/react/customize-theme-cn#服务端渲染
 * - 相关 Issue：https://github.com/ant-design/ant-design/issues/38555
 */
export function AntdStyleProvider(props: React.PropsWithChildren) {
  return <AntdStyleRegister>{props.children}</AntdStyleRegister>
}

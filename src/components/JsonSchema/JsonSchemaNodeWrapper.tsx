export function JsonSchemaNodeWrapper(
  props: React.PropsWithChildren<{
    className?: string
    shouldExpand?: boolean
  }>
) {
  const { children, className = '', shouldExpand } = props

  return (
    <div className={className} style={{ display: shouldExpand ? 'block' : 'none' }}>
      {children}
    </div>
  )
}

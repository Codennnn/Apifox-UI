export function AppMenuControls(props: React.PropsWithChildren) {
  return (
    <span className="ui-menu-controls ml-auto hidden items-center whitespace-nowrap">
      {props.children}
    </span>
  )
}

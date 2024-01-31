export function AppMenuControls(props: React.PropsWithChildren) {
  return (
    <span className="app-menu-controls ml-auto hidden whitespace-nowrap">{props.children}</span>
  )
}

interface IconTextProps {
  icon?: React.ReactNode
  text?: string
}

export function IconText({ icon, text }: IconTextProps) {
  return (
    <span className="!inline-flex h-full items-center justify-center gap-1">
      {icon}
      {text ? <span>{text}</span> : null}
    </span>
  )
}

import JsonView from 'react18-json-view'

import 'react18-json-view/src/style.css'

interface JsonViewerProps {
  value?: string
}

export function JsonViewer(props: JsonViewerProps) {
  const { value } = props

  if (!value) {
    return null
  }

  return <JsonView src={JSON.parse(value)} />
}

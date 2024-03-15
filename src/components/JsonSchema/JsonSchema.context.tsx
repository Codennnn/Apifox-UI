import { createContext, useContext } from 'react'

import type { JsonSchemaEditorProps } from './JsonSchemaEditor'

type JsonSchemaContextData = Pick<
  JsonSchemaEditorProps,
  'readOnly' | 'expandedKeys' | 'onExpand' | 'extraColumns'
>

const JsonSchemaContext = createContext({} as JsonSchemaContextData)

export function JsonSchemaContextProvider(
  props: React.PropsWithChildren<{ value: JsonSchemaContextData }>
) {
  return (
    <JsonSchemaContext.Provider value={props.value}>{props.children}</JsonSchemaContext.Provider>
  )
}

export const useJsonSchemaContext = () => useContext(JsonSchemaContext)

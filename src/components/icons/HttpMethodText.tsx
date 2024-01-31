import { HTTP_METHOD_CONFIG } from '@/configs/static'
import type { HttpMethod } from '@/enums'

interface HttpIconProps {
  method?: HttpMethod
  className?: string
  text?: string
}

export function HttpMethodText({ method, className = '', text }: HttpIconProps) {
  if (method) {
    try {
      const httpMethod = HTTP_METHOD_CONFIG[method]
      return (
        <span className={className} style={{ color: `var(${httpMethod.color})` }}>
          {text || httpMethod.text}
        </span>
      )
    } catch {
      return null
    }
  }

  return null
}

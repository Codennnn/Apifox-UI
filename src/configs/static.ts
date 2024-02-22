import { ApiStatus, CatalogType, HttpMethod } from '@/enums'

/** 有关 HTTP 方法的用于展示配置。 */
export const HTTP_METHOD_CONFIG = {
  [HttpMethod.Get]: {
    text: HttpMethod.Get,
    color: '--color-green-6',
  },
  [HttpMethod.Post]: {
    text: HttpMethod.Post,
    color: '--color-orange-6',
  },
  [HttpMethod.Put]: {
    text: HttpMethod.Put,
    color: '--color-blue-6',
  },
  [HttpMethod.Delete]: {
    text: 'DEL',
    color: '--color-volcano-6',
  },
  [HttpMethod.Options]: {
    text: 'OPT',
    color: '--color-blue-6',
  },
  [HttpMethod.Head]: {
    text: HttpMethod.Head,
    color: '--color-blue-6',
  },
  [HttpMethod.Patch]: {
    text: 'PAT',
    color: '--color-pink-6',
  },
  [HttpMethod.Trace]: {
    text: 'TRA',
    color: '--color-geekblue-6',
  },
} as const satisfies Record<
  HttpMethod,
  {
    text: string
    color: string
  }
>

export const API_STATUS_CONFIG = {
  [ApiStatus.Designing]: {
    text: '设计中',
    color: '--color-lime-6',
  },
  [ApiStatus.Pending]: {
    text: '待确定',
    color: '--color-yellow-6',
  },
  [ApiStatus.Developing]: {
    text: '开发中',
    color: '--color-blue-6',
  },
  [ApiStatus.Obsolete]: {
    text: '已废弃',
    color: '--color-grey-6',
  },
  [ApiStatus.Integrating]: {
    text: '联调中',
    color: '--color-pink-6',
  },
  [ApiStatus.Testing]: {
    text: '测试中',
    color: '--color-orange-6',
  },
  [ApiStatus.Tested]: {
    text: '已测完',
    color: '--color-purple-6',
  },
  [ApiStatus.Released]: {
    text: '已发布',
    color: '--color-green-6',
  },
  [ApiStatus.Deprecated]: {
    text: '将废弃',
    color: '--color-grey-6',
  },
  [ApiStatus.Exception]: {
    text: '有异常',
    color: '--color-red-6',
  },
} as const satisfies Record<
  ApiStatus,
  {
    text: string
    color: string
  }
>

export const apiMenuConfig = {
  [CatalogType.Overview]: {
    title: '项目概况',
    newLabel: '',
    tipTitle: '',
  },
  [CatalogType.Recycle]: {
    title: '回收站',
    newLabel: '',
    tipTitle: '',
  },
  [CatalogType.Http]: {
    title: '接口',
    newLabel: '新建接口',
    tipTitle: '添加接口',
  },
  [CatalogType.Schema]: {
    title: '数据模型',
    newLabel: '新建数据模型',
    tipTitle: '添加数据模型',
  },
  [CatalogType.Request]: {
    title: '快捷请求',
    newLabel: '新建快捷请求',
    tipTitle: '添加快捷请求',
  },
  [CatalogType.Markdown]: {
    title: 'Markdown',
    newLabel: '新建 Markdown',
    tipTitle: '添加 Markdown',
  },
} as const satisfies Record<CatalogType, { title: string; tipTitle: string; newLabel: string }>

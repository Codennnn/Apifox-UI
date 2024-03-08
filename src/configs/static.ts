import { ApiStatus, CatalogType, HttpMethod, ParamType } from '@/enums'

/** 根目录 ID。 */
export const ROOT_CATALOG = '_'

/** 服务 ID： 继承自父级。 */
export const SERVER_INHERIT = ''

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

export const HTTP_CODE_CONFIG = {
  [200]: {
    value: 200,
    text: '成功',
    desc: '请求成功',
  },
  [201]: {
    value: 201,
    text: '成功',
    desc: '请求成功，并且创建了一个新资源。这通常是在 POST 请求或部分 PUT 请求后发送的响应',
  },
  [202]: {
    value: 202,
    text: '成功',
    desc: '请求已收到，但尚未采取行动',
  },
  [204]: {
    value: 204,
    text: '删除成功',
    desc: '此请求没有要发送的内容，但标头可能有用',
  },
  [400]: {
    value: 400,
    text: '请求有误',
    desc: '由于被视为客户端错误的某种原因，服务器无法或不愿处理请求',
  },
  [401]: {
    value: 401,
    text: '没有权限',
    desc: '尽管 HTTP 标准指定为“未授权”，但从语义上讲，此响应意味着“未认证”',
  },
  [403]: {
    value: 403,
    text: '禁止访问',
    desc: '客户端没有访问内容的权限；也就是说，它未获授权，因此服务器拒绝提供所请求的资源',
  },
  [404]: {
    value: 404,
    text: '记录不存在',
    desc: '服务器找不到请求的资源。在浏览器中，这意味着 URL 无法识别。在 API 中，这还可能意味着端点是有效的，但资源本身不存在',
  },
  [410]: {
    value: 410,
    text: '记录不存在',
    desc: '当请求的内容已从服务器永久删除且无转发地址时发送此响应',
  },
  [422]: {
    value: 422,
    text: '参数错误',
    desc: '请求格式正确，但由于语义错误无法执行',
  },
  [500]: {
    value: 500,
    text: '服务器错误',
    desc: '服务器遇到无法处理的情况',
  },
  [502]: {
    value: 502,
    text: '网关错误',
    desc: '当服务器作为网关获取处理请求所需响应时，收到无效响应时发送此错误响应',
  },
  [503]: {
    value: 503,
    text: '服务器故障',
    desc: '服务器尚未准备好处理请求',
  },
  [504]: {
    value: 504,
    text: '网关超时',
    desc: '当服务器充当网关时无法及时获取响应时，发送此错误响应',
  },
} as const satisfies Record<number, { value: number; text: string; desc: string }>

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

export const PARAMS_CONFIG = {
  [ParamType.String]: {
    varColor: '--color-green-6',
  },
  [ParamType.Integer]: {
    varColor: '--color-pink-6',
  },
  [ParamType.Boolean]: {
    varColor: '--color-pink-6',
  },
  [ParamType.Number]: {
    varColor: '--color-pink-6',
  },
  [ParamType.Array]: {
    varColor: '--color-green-6',
  },
} as const satisfies Record<
  ParamType,
  {
    varColor: string
  }
>

export const API_MENU_CONFIG = {
  [CatalogType.Overview]: {
    title: '项目概况',
    newLabel: '',
    tipTitle: '',
    accentColor: '',
  },
  [CatalogType.Recycle]: {
    title: '回收站',
    newLabel: '',
    tipTitle: '',
    accentColor: '',
  },
  [CatalogType.Http]: {
    title: '接口',
    newLabel: '新建接口',
    tipTitle: '添加接口',
    accentColor: '#eb2f96',
  },
  [CatalogType.Schema]: {
    title: '数据模型',
    newLabel: '新建数据模型',
    tipTitle: '添加数据模型',
    accentColor: '#9373ee',
  },
  [CatalogType.Request]: {
    title: '快捷请求',
    newLabel: '新建快捷请求',
    tipTitle: '添加快捷请求',
    accentColor: 'rgb(95 128 233)',
  },
  [CatalogType.Markdown]: {
    title: 'Markdown',
    newLabel: '新建 Markdown',
    tipTitle: '添加 Markdown',
    accentColor: '#13c2c2',
  },
} as const satisfies Record<
  CatalogType,
  { title: string; tipTitle: string; newLabel: string; accentColor: string }
>

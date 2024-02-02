/** HTTP 请求方法。 */
export const enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Head = 'HEAD',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Trace = 'TRACE',
}

/** API 状态。 */
export const enum ApiStatus {
  Designing = 'designing',
  Pending = 'pending',
  Developing = 'developing',
  Obsolete = 'obsolete',
  Integrating = 'integrating',
  Testing = 'testing',
  Tested = 'tested',
  Released = 'released',
  Deprecated = 'deprecated',
  Exception = 'exception',
}

/** 接口菜单顶级目录的分类类型。 */
export const enum CatalogType {
  /** 项目概况。 */
  Overview = 'overview',
  /** 接口。 */
  Http = 'http',
  /** 数据模型。 */
  Schema = 'schema',
  /** 快捷请求。 */
  Request = 'request',
  /** 回收站。 */
  Recycle = 'recycle',
  /** Markdown 文件。 */
  Markdown = 'markdown',
}

/** 接口菜单目录层级类型。 */
export const enum MenuType {
  Folder,
  File,
}

export const enum MenuItemType {
  ApiDetail = 'apiDetail',
  ApiDetailFolder = 'apiDetailFolder',
  ApiSchema = 'apiSchema',
  ApiSchemaFolder = 'apiSchemaFolder',
  HttpResponse = 'httpResponse',
  HttpRequest = 'httpRequest',
  Doc = 'doc',
}

export const enum MenuId {
  宠物店 = '.1',
  查询宠物详情 = '.1.2',
  新建宠物信息 = '.1.3',
  文档 = '.2',
}

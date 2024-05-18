export function getPageTitle(title?: string): string {
  const mainTitle = 'Apifox UI'

  return title ? `${title} - ${mainTitle}` : mainTitle
}

/** 将 JS 序列化为 JSON 的超集，包括正则表达式，日期和函数。 */
export { default as serialize } from 'serialize-javascript'

/** 反序列化，对应 serialize 方法。 */
export function deserialize<ReturnType = unknown>(data: any): ReturnType {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/restrict-plus-operands
  return Function('"use strict";return (' + data + ')')() as ReturnType
}

/** 检查传入的值是否为简单的 JS 对象。 */
export function isPureObject(value: any): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

/** 移动数组元素。 */
export function moveArrayItem<T>(arr: T[], fromIndex: number, toIndex: number) {
  // 先删除原位置上的元素。
  const element = arr.splice(fromIndex, 1)[0]

  // 然后在指定位置插入该元素。
  arr.splice(toIndex, 0, element)
}

/**
 * 文字列をオブジェクトにパースしたものを返却する
 *
 * @param stringifiedObject
 */
export const jsonParse = <T>(stringifiedObject: string): T => JSON.parse(stringifiedObject)

/**
 * オブジェクトを文字列化したものを返却する
 *
 * @param object
 */
export const jsonStringify = <T>(object: T): string => JSON.stringify(object)

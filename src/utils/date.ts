import { Dayjs } from 'dayjs'

/**
 * 日付を指定した形式でフォーマットした文字列を返却する
 *
 * @param date
 * @param template
 */
export const dateFormat = (date: Dayjs, template = 'YYYY-MM-DD') => date.format(template)

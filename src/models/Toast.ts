import { nanoid } from '@reduxjs/toolkit'
import dayjs, { Dayjs } from 'dayjs'

/**
 * Toastの内容
 */
export interface ToastContent {
  id: string
  level: Level
  content: string
  createdAt: Dayjs
}
export const buildToastContent = (level: Level, content: string) => ({
  // IDはランダム生成
  id: nanoid(8),
  level,
  content,
  createdAt: dayjs(),
})

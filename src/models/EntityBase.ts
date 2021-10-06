import { Dayjs } from 'dayjs'

/**
 * 基底エンティティ
 */
export interface EntityBase {
  // 作成日時
  createdAt: Dayjs
  // 更新日時（新規作成のときは作成日時と同じものが入る）
  updatedAt: Dayjs
}

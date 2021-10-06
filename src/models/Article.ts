import { DocumentData, Timestamp } from 'firebase/firestore'
import { RawDraftContentState } from 'draft-js'
import dayjs from 'dayjs'
import { EntityBase } from '@/models/EntityBase'
import { jsonParse } from '@/utils/json'

/**
 * Articleエンティティ
 */
export interface Article extends EntityBase {
  id: FirestoreDocumentId
  // 所有する（作成した）アカウントのUID
  ownerUid: AuthUid
  // タイトル
  title: string
  // 本文
  body: RawDraftContentState
  // サムネイル画像のURL（未設定の場合はなし）
  thumbnailUrl?: string
  // 状態
  status: ArticleStatusType
}
export const buildArticle = (docId: FirestoreDocumentId, docData: DocumentData): Article => {
  const { ownerUid, title, body, thumbnailUrl, status, createdAt, updatedAt } = docData
  return {
    id: docId,
    ownerUid,
    title,
    body: jsonParse<RawDraftContentState>(body),
    thumbnailUrl,
    status,
    createdAt: dayjs((<Timestamp>createdAt).toDate()),
    updatedAt: dayjs((<Timestamp>updatedAt).toDate()),
  }
}

/**
 * Articleエンティティの状態
 */
export const ArticleStatus = {
  Published: 'published',
  Draft: 'draft',
  Removed: 'removed',
} as const
export type ArticleStatusType = typeof ArticleStatus[keyof typeof ArticleStatus]

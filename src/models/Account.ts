import { DocumentData, Timestamp } from 'firebase/firestore'
import dayjs from 'dayjs'
import { EntityBase } from '@/models/EntityBase'

/**
 * Accountエンティティ
 */
export interface Account extends EntityBase {
  id: FirestoreDocumentId
  uid: AuthUid
  // ディスプレイネーム
  displayName: string
  // アバター画像のURL（未設定の場合はなし）
  avatarUrl?: string
  // 有効/無効
  status: AccountStatusType
}
export const buildAccount = (docId: FirestoreDocumentId, docData: DocumentData): Account => {
  const { uid, displayName, avatarUrl, status, createdAt, updatedAt } = docData
  return {
    id: docId,
    uid,
    displayName,
    avatarUrl,
    status,
    createdAt: dayjs((<Timestamp>createdAt).toDate()),
    updatedAt: dayjs((<Timestamp>updatedAt).toDate()),
  }
}

/**
 * Accountエンティティの有効/無効
 */
export const AccountStatus = {
  active: 'active',
  inactive: 'inactive',
} as const
export type AccountStatusType = typeof AccountStatus[keyof typeof AccountStatus]

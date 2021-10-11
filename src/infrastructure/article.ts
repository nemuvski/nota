import {
  FirestoreError as FirebaseFirestoreError,
  documentId,
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { firestore } from '@/libs/firebase'
import { PREFIX_COLLECTION_PATH } from '@/constants/firestore'
import { ArticleStatus, ArticleStatusType, buildArticle } from '@/models/Article'
import FirestoreError from '@/exceptions/FirestoreError'
import { RawDraftContentState } from 'draft-js'
import { jsonStringify } from '@/utils/json'

const collectionRef = collection(firestore, PREFIX_COLLECTION_PATH, 'Article')

/**
 * 公開されているArticleドキュメントを取得
 *
 * @param id
 */
export const getPublishedArticle = async (id: FirestoreDocumentId) => {
  try {
    const snapshot = await getDocs(
      query(collectionRef, where(documentId(), '==', id), where('status', '==', ArticleStatus.Published))
    )
    if (!snapshot.docs.length) return undefined
    // 必然的に1つになる
    const fetchedDoc = snapshot.docs[0]
    return buildArticle(fetchedDoc.id, fetchedDoc.data())
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * 所有アカウントのArticleドキュメントを取得
 *
 * @param id
 * @param ownerUid
 */
export const getMyArticle = async (id: FirestoreDocumentId, ownerUid: AuthUid) => {
  try {
    const snapshot = await getDocs(
      query(
        collectionRef,
        where(documentId(), '==', id),
        where('ownerUid', '==', ownerUid),
        where('status', 'in', [ArticleStatus.Published, ArticleStatus.Draft])
      )
    )
    if (!snapshot.docs.length) return undefined
    // 必然的に1つになる
    const fetchedDoc = snapshot.docs[0]
    return buildArticle(fetchedDoc.id, fetchedDoc.data())
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * 所有アカウントのArticleドキュメント群を取得
 *
 * @param ownerUid
 */
export const getArticlesByOwnerUid = async (ownerUid: AuthUid) => {
  try {
    const snapshot = await getDocs(
      query(
        collectionRef,
        where('ownerUid', '==', ownerUid),
        where('status', 'in', [ArticleStatus.Published, ArticleStatus.Draft])
      )
    )
    return snapshot.docs.map((d) => buildArticle(d.id, d.data()))
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * Articleドキュメントを追加し、追加したドキュメントを取得
 *
 * @param ownerUid
 * @param title
 * @param body
 * @param status
 * @param thumbnailUrl
 */
export const addArticle = async (
  ownerUid: AuthUid,
  title: string,
  body: RawDraftContentState,
  status: ArticleStatusType,
  thumbnailUrl?: string
) => {
  const currentTimestamp = serverTimestamp()
  try {
    const newDoc = await addDoc(collectionRef, {
      ownerUid,
      title,
      body: jsonStringify<RawDraftContentState>(body),
      thumbnailUrl,
      status,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })
    return await getMyArticle(newDoc.id, ownerUid)
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * Articleドキュメントを更新し、更新したドキュメントを取得
 *
 * @param id
 * @param ownerUid
 * @param title
 * @param body
 * @param status
 * @param thumbnailUrl
 */
export const updateArticle = async (
  id: FirestoreDocumentId,
  ownerUid: AuthUid,
  title: string,
  body: RawDraftContentState,
  status: ArticleStatusType,
  thumbnailUrl?: string
) => {
  const currentTimestamp = serverTimestamp()
  try {
    await setDoc(
      doc(collectionRef, id),
      {
        ownerUid,
        title,
        body: jsonStringify<RawDraftContentState>(body),
        thumbnailUrl,
        status,
        updatedAt: currentTimestamp,
      },
      { merge: true }
    )
    return await getMyArticle(id, ownerUid)
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

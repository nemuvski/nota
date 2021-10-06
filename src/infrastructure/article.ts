import {
  FirestoreError as FirebaseFirestoreError,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { firestore } from '@/libs/firebase'
import { PREFIX_COLLECTION_PATH } from '@/constants/firestore'
import { ArticleStatusType, buildArticle } from '@/models/Article'
import FirestoreError from '@/exceptions/FirestoreError'
import { RawDraftContentState } from 'draft-js'
import { jsonStringify } from '@/utils/json'

const collectionRef = collection(firestore, PREFIX_COLLECTION_PATH, 'Article')

/**
 * Articleドキュメントを取得
 *
 * @param id
 */
export const getArticle = async (id: FirestoreDocumentId) => {
  try {
    const snapshot = await getDoc(doc(collectionRef, id))
    const docData = snapshot.data()
    if (!docData) return undefined
    return buildArticle(snapshot.id, docData)
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
      query(collectionRef, where('ownerUid', '==', ownerUid), orderBy('updatedAt', 'desc'))
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
    return await getArticle(newDoc.id)
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

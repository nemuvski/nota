import {
  FirestoreError as FirebaseFirestoreError,
  documentId,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { firestore } from '@/libs/firebase'
import { PREFIX_COLLECTION_PATH } from '@/constants/firestore'
import { AccountStatus, buildAccount } from '@/models/Account'
import FirestoreError from '@/exceptions/FirestoreError'

const collectionRef = collection(firestore, PREFIX_COLLECTION_PATH, 'Account')

/**
 * Accountドキュメントを取得
 *
 * @param uid
 */
export const getAccount = async (uid: AuthUid) => {
  try {
    const snapshot = await getDocs(
      query(collectionRef, where(documentId(), '==', uid), where('status', '==', AccountStatus.Active))
    )
    if (!snapshot.docs.length) return undefined
    // 必然的に1つになる
    const fetchedDoc = snapshot.docs[0]
    return buildAccount(fetchedDoc.id, fetchedDoc.data())
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * Accountドキュメントを追加し、追加したドキュメントを取得
 *
 * @param uid
 * @param displayName
 */
export const addAccount = async (uid: AuthUid, displayName = 'Incognito') => {
  const currentTimestamp = serverTimestamp()
  try {
    // ドキュメントIDはUIDとする
    await setDoc(doc(collectionRef, uid), {
      uid,
      displayName,
      status: AccountStatus.Active,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })
    return await getAccount(uid)
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * Accountドキュメントを更新
 *
 * @param uid
 * @param displayName
 * @param avatarUrl
 */
export const updateAccount = async (uid: AuthUid, displayName: string, avatarUrl?: string) => {
  const currentTimestamp = serverTimestamp()
  try {
    await setDoc(
      doc(collectionRef, uid),
      {
        displayName,
        avatarUrl,
        updatedAt: currentTimestamp,
      },
      { merge: true }
    )
    return await getAccount(uid)
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

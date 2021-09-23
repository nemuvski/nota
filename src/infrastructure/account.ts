import {
  FirestoreError as FirebaseFirestoreError,
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { firestore } from '@/libs/firebase'
import { PREFIX_COLLECTION_PATH } from '@/constants/firestore'
import { AccountStatus, buildAccount } from '@/models/Account'
import FirestoreError from '@/exceptions/FirestoreError'

const collectionRef = collection(firestore, PREFIX_COLLECTION_PATH, 'Account')

/**
 * Accountドキュメントを追加（新規作成時に利用される）
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
      status: AccountStatus.active,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    })
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

/**
 * Accountドキュメントを取得
 *
 * @param uid
 */
export const getAccount = async (uid: AuthUid) => {
  try {
    const snapshot = await getDoc(doc(collectionRef, uid))
    const docData = snapshot.data()
    if (!docData) return undefined
    return buildAccount(snapshot.id, docData)
  } catch (error) {
    throw new FirestoreError(error as FirebaseFirestoreError)
  }
}

import { uploadBytes, getDownloadURL, ref, StorageReference, StorageError } from 'firebase/storage'
import CloudStorageError from '@/exceptions/CloudStorageError'
import { storage } from '@/libs/firebase'
import { STORAGE_ACCOUNT_DIR, STORAGE_ROOT_DIR } from '@/constants/storage'

const dirRef = (uid: AuthUid): StorageReference => ref(storage, [STORAGE_ROOT_DIR, STORAGE_ACCOUNT_DIR, uid].join('/'))

/**
 * Accountのアバター画像をアップロードし、ダウンロードURLを取得
 *
 * @param uid
 * @param data
 * @param filename
 */
export const uploadAvatarImage = async (uid: AuthUid, data: Blob, filename = 'avatar.jpg'): Promise<string> => {
  try {
    const result = await uploadBytes(ref(dirRef(uid), filename), data)
    return await getDownloadURL(result.ref)
  } catch (error) {
    throw new CloudStorageError(error as StorageError)
  }
}

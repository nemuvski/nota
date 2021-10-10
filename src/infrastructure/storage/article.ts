import { uploadBytes, getDownloadURL, ref, StorageReference, StorageError } from 'firebase/storage'
import { nanoid } from '@reduxjs/toolkit'
import CloudStorageError from '@/exceptions/CloudStorageError'
import { storage } from '@/libs/firebase'
import { STORAGE_ARTICLE_DIR, STORAGE_ROOT_DIR } from '@/constants/storage'

type SubDir = 'thumbnail'

const dirRef = (uid: AuthUid, subDir: SubDir): StorageReference =>
  ref(storage, [STORAGE_ROOT_DIR, STORAGE_ARTICLE_DIR, subDir, uid].join('/'))

/**
 * Articleのサムネイル画像をアップロードし、ダウンロードURLを取得
 *
 * @param uid
 * @param data
 */
export const uploadThumbnailImage = async (uid: AuthUid, data: Blob): Promise<string> => {
  try {
    // ファイル名は現在時刻とランダムな文字列から成る
    const filename = `${Date.now()}-${nanoid(8)}.jpg`
    const result = await uploadBytes(ref(dirRef(uid, 'thumbnail'), filename), data)
    return await getDownloadURL(result.ref)
  } catch (error) {
    throw new CloudStorageError(error as StorageError)
  }
}

import { StorageError } from 'firebase/storage'

/**
 * Cloud Storage for FirebaseのError
 */
export default class CloudStorageError extends Error {
  constructor(error: StorageError) {
    super(error.message)
  }
}

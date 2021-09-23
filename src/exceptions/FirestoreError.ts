import { FirestoreError as FirebaseFirestoreError } from 'firebase/firestore'

/**
 * FirestoreのError
 */
export default class FirestoreError extends Error {
  constructor(error: FirebaseFirestoreError) {
    super(error.message)
  }
}

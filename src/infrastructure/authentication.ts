import { AuthError, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '@/libs/firebase'
import AuthenticationError from '@/exceptions/AuthenticationError'

/**
 * 新規登録
 *
 * @param email
 * @param password
 */
export const signUp = async (email: string, password: string) => {
  try {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
  } catch (error) {
    throw new AuthenticationError(error as AuthError)
  }
}

/**
 * ログイン
 *
 * @param email
 * @param password
 */
export const logIn = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
  } catch (error) {
    throw new AuthenticationError(error as AuthError)
  }
}

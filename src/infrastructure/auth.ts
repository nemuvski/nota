import {
  UserCredential,
  User,
  AuthError as FirebaseAuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth'
import { firebaseAuth } from '@/libs/firebase'
import AuthError from '@/exceptions/AuthError'

/**
 * 新規登録
 *
 * @param email
 * @param password
 */
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password)
  } catch (error) {
    throw new AuthError(error as FirebaseAuthError)
  }
}

/**
 * ログイン
 *
 * @param email
 * @param password
 */
export const logIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
  } catch (error) {
    throw new AuthError(error as FirebaseAuthError)
  }
}

/**
 * ログアウト
 */
export const logOut = async () => {
  try {
    await signOut(firebaseAuth)
  } catch (error) {
    throw new AuthError(error as FirebaseAuthError)
  }
}

/**
 * パスワードリセットの案内メールを送信する
 *
 * @param email
 */
export const sendPasswordResetInstructions = async (email: string) => {
  try {
    await sendPasswordResetEmail(firebaseAuth, email)
  } catch (error) {
    throw new AuthError(error as FirebaseAuthError)
  }
}

/**
 * メールアドレスの確認のメールを送信する
 *
 * @param user
 */
export const sendEmailAddressVerification = async (user?: User) => {
  try {
    const currentUser = user ?? firebaseAuth.currentUser
    if (currentUser) {
      await sendEmailVerification(currentUser)
    } else {
      console.error('Failed to send an email verification')
    }
  } catch (error) {
    throw new AuthError(error as FirebaseAuthError)
  }
}

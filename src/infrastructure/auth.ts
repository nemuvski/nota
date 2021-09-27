import {
  UserCredential,
  EmailAuthProvider,
  AuthError as FirebaseAuthError,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  updateEmail,
} from 'firebase/auth'
import { firebaseAuth } from '@/libs/firebase'
import AuthError from '@/exceptions/AuthError'

/**
 * 現在のUserを返却する (オブジェクトが存在しない場合はエラー)
 */
const getCurrentUser = () => {
  const { currentUser } = firebaseAuth
  if (!currentUser || !currentUser.email) {
    throw new Error('Failed to get current user')
  }
  return currentUser
}

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
 * メールアドレスの変更
 *
 * @param newEmail
 * @param password
 */
export const changeEmailAddress = async (newEmail: string, password: string) => {
  try {
    const currentUser = getCurrentUser()
    // 認証方法はメールアドレス/パスワード認証のみなので、必ずメールアドレスは入る
    if (currentUser.email) {
      await reauthenticateWithCredential(currentUser, EmailAuthProvider.credential(currentUser.email, password))
      await updateEmail(currentUser, newEmail)
    }
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
 */
export const sendEmailAddressVerification = async () => {
  try {
    const currentUser = getCurrentUser()
    await sendEmailVerification(currentUser)
  } catch (error) {
    throw new AuthError(error as FirebaseAuthError)
  }
}

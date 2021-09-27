import { User } from 'firebase/auth'

/**
 * Firebase Authenticationで得られるUserオブジェクトの一部
 */
export interface AuthUser {
  uid: AuthUid
  email: string | null
  emailVerified: boolean
}
export const buildAuthUser = (user: User): AuthUser => {
  const { uid, email, emailVerified } = user
  return {
    uid,
    email,
    emailVerified,
  }
}

import { AuthError as FirebaseAuthError, AuthErrorCodes } from 'firebase/auth'

/**
 * 認証関連のError
 */
export default class AuthError extends Error {
  constructor(error: FirebaseAuthError) {
    let message

    switch (error.code) {
      case AuthErrorCodes.EMAIL_EXISTS:
        message = 'Email already in use'
        break

      case AuthErrorCodes.USER_DELETED:
        message = 'Account not found'
        break

      case AuthErrorCodes.INVALID_PASSWORD:
        message = 'Wrong password'
        break

      case AuthErrorCodes.INVALID_EMAIL:
        message = 'Invalid email'
        break

      case AuthErrorCodes.USER_DISABLED:
        message = 'Account disabled'
        break

      case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
        message = 'Please log in again'
        break

      default:
        message = error.message
    }

    super(message)
  }
}

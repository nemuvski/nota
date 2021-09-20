import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '@/libs/firebase'
import { setAuth } from '@/stores/auth/slice'
import { buildAuthUser } from '@/models/AuthUser'
import { selectAuth } from '@/stores/auth/selector'

/**
 * Firebase Authenticationの認証状態を監視
 */
export const useAuthStateChanged = () => {
  const dispatch = useDispatch()
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    let mounted = true
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {
        if (mounted) {
          setIsProcessing(true)
          dispatch(setAuth({ user: user ? buildAuthUser(user) : null }))
          setIsProcessing(false)
        }
      },
      (error) => console.error(error)
    )
    return () => {
      unsubscribe()
      mounted = false
    }
  }, [dispatch])

  return isProcessing
}

/**
 * ログインしているか否かの真偽値と認証情報を返却する
 */
export const useLoginState = () => {
  const auth = useSelector(selectAuth)
  return {
    auth,
    isLogin: !!auth,
  }
}

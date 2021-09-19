import { useSelector } from 'react-redux'
import { selectAuth } from '@/stores/auth/selector'

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

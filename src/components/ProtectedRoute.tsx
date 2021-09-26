import React from 'react'
import { Router } from 'next/router'
import { isBrowser } from '@/utils/environment'
import { useLoginState } from '@/hooks/auth'

type Props = {
  router: Router
}

const ProtectedRoute: React.FC<Props> = ({ router, children }) => {
  const { isLogin, auth } = useLoginState()

  if (!isBrowser()) return <>{children}</>

  const pathname = router.pathname

  console.debug('[Current Page]', pathname)

  // ログインしているときのリダイレクト
  if (isLogin) {
    if (/^\/(forgot-password|login|signup)\/?/.test(pathname)) {
      router.replace('/')
    }

    // メールアドレス確認がされていないときは、メールアドレスとパスワードの変更はできないようにリダイレクトさせる
    if (!auth?.emailVerified && /^\/(settings\/change-email|settings\/change-password)\/?/.test(pathname)) {
      router.replace('/settings')
    }
  }
  // ログインしていないときのリダイレクト
  else {
    if (/^\/(dashboard|settings)\/?/.test(pathname)) {
      router.replace('/login')
    }
  }

  return <>{children}</>
}

export default ProtectedRoute

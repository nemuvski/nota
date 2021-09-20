import React from 'react'
import { Router } from 'next/router'
import { isBrowser } from '@/utils/environment'
import { useLoginState } from '@/hooks/auth'

type Props = {
  router: Router
}

const ProtectedRoute: React.FC<Props> = ({ router, children }) => {
  const { isLogin } = useLoginState()

  if (!isBrowser()) return <>{children}</>

  console.debug('[Current Page]', router.pathname)

  // ログインしているときにフロントページにリダイレクトする
  if (isLogin && /^\/(forgot-password|login|signup)\/?$/.test(router.pathname)) {
    router.replace('/')
  }
  // ログインしていないときにログインページにリダイレクトする
  else if (/^\/(mypage)\/?$/.test(router.pathname)) {
    router.replace('/login')
  }

  return <>{children}</>
}

export default ProtectedRoute

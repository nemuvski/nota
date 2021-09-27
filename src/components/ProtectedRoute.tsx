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

  const pathname = router.pathname

  console.debug('[Current Page]', pathname)

  // ログインしているときのリダイレクト
  if (isLogin) {
    if (/^\/(forgot-password|login|signup)\/?/.test(pathname)) {
      router.replace('/')
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

import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useEffect } from 'react'
import { logOut } from '@/infrastructure/auth'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'

const LogoutPage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    logOut().finally(() => {
      router.replace('/')
    })
  }, [router])

  return (
    <Layout title='Log out'>
      <Loading />
    </Layout>
  )
}

export default LogoutPage

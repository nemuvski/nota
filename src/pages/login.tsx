import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import EmailAndPasswordForm from '@/components/EmailAndPasswordForm'

const LoginPage: NextPage = () => {
  return (
    <Layout title='Log in'>
      <EmailAndPasswordForm />
    </Layout>
  )
}

export default LoginPage

import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EmailAndPasswordForm from '@/components/EmailAndPasswordForm'
import Paragraph from '@/styles/paragraph.component'
import PageTitle from '@/styles/page-title.component'

const LoginPage: NextPage = () => {
  return (
    <Layout title='Log in'>
      <PageTitle>Log in</PageTitle>
      <EmailAndPasswordForm />
      <Paragraph alignment='center'>
        {"Don't have an account yet?"} <Link href='/signup'>Sign up here</Link>
        <br />
        <Link href='/forgot-password'>Forgot your password?</Link>
      </Paragraph>
    </Layout>
  )
}

export default LoginPage

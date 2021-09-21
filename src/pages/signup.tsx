import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EmailAndPasswordForm from '@/components/EmailAndPasswordForm'
import Paragraph from '@/styles/paragraph.component'
import PageTitle from '@/styles/page-title.component'

const SignupPage: NextPage = () => {
  return (
    <Layout title='Sign up'>
      <PageTitle>Sign up</PageTitle>
      <Paragraph alignment='center'>{"After you sign up, we'll send you an email verification."}</Paragraph>
      <EmailAndPasswordForm isSignUpMode={true} />
      <Paragraph alignment='center'>
        Already have an account? <Link href='/login'>Log in here</Link>
      </Paragraph>
    </Layout>
  )
}

export default SignupPage

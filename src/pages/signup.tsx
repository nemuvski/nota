import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EmailAndPasswordForm from '@/components/EmailAndPasswordForm'
import Paragraph from '@/styles/paragraph.component'

const SignupPage: NextPage = () => {
  return (
    <Layout title='Sign up'>
      <EmailAndPasswordForm isSignUpMode={true} />
      <Paragraph alignment='center'>
        Already have an account? <Link href='/login'>Log in here</Link>
      </Paragraph>
    </Layout>
  )
}

export default SignupPage

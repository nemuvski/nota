import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import EmailAndPasswordForm from '@/components/EmailAndPasswordForm'

const SignupPage: NextPage = () => {
  return (
    <Layout title='Sign up'>
      <EmailAndPasswordForm isSignUpMode={true} />
    </Layout>
  )
}

export default SignupPage

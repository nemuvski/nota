import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/page-title.component'
import Box from '@/styles/box.component'

const ChangePasswordPage: NextPage = () => {
  return (
    <Layout title='Change Password'>
      <PageTitle>Change Password</PageTitle>

      <Box>It works!</Box>
    </Layout>
  )
}

export default ChangePasswordPage

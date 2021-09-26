import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/page-title.component'
import Box from '@/styles/box.component'

const ChangeEmailPage: NextPage = () => {
  return (
    <Layout title='Change Email'>
      <PageTitle>Change Email</PageTitle>

      <Box>It works!</Box>
    </Layout>
  )
}

export default ChangeEmailPage

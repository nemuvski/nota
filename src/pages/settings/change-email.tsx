import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/styled-components/page-title.component'
import Box from '@/styles/styled-components/box.component'

const ChangeEmailPage: NextPage = () => {
  return (
    <Layout title='Change Email'>
      <PageTitle>Change Email</PageTitle>

      <Box>It works!</Box>
    </Layout>
  )
}

export default ChangeEmailPage

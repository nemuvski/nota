import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/styled-components/page-title.component'

const CreateArticlePage: NextPage = () => {
  return (
    <Layout title='Create Article'>
      <PageTitle>Create Article</PageTitle>
    </Layout>
  )
}

export default CreateArticlePage

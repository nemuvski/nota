import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/page-title.component'
import Paragraph from '@/styles/paragraph.component'
import Button from '@/styles/button.component'
import { useRouter } from 'next/router'

const NotFoundPage: NextPage = () => {
  const router = useRouter()

  return (
    <Layout title='Page not found'>
      <PageTitle>Sorry, the page not found</PageTitle>
      <Paragraph alignment='center'>
        The link you followed probably broken,
        <br />
        or the page has been removed.
      </Paragraph>
      <Paragraph alignment='center'>
        <Button type='button' color='primary' onClick={() => router.push('/')}>
          Back to home
        </Button>
      </Paragraph>
    </Layout>
  )
}

export default NotFoundPage

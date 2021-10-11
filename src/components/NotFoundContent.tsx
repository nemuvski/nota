import React from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/styled-components/page-title.component'
import Paragraph from '@/styles/styled-components/paragraph.component'
import Button from '@/styles/styled-components/button.component'

const NotFoundContent = () => {
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

export default NotFoundContent

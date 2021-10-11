import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Button from '@/styles/styled-components/button.component'

const DashboardIndexPage: NextPage = () => {
  const router = useRouter()

  return (
    <Layout title='Dashboard'>
      <Button type='button' color='primary' onClick={() => router.push('/own/articles/create')}>
        Create Article
      </Button>
    </Layout>
  )
}

export default DashboardIndexPage

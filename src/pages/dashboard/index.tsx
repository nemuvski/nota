import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import Button from '@/styles/styled-components/button.component'
import { useRouter } from 'next/router'

const DashboardIndexPage: NextPage = () => {
  const router = useRouter()

  return (
    <Layout title='Dashboard'>
      <Button type='button' color='primary' onClick={() => router.push('/own/article/create')}>
        Create Article
      </Button>
    </Layout>
  )
}

export default DashboardIndexPage

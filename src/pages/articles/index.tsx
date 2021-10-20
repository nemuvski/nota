import type { NextPage } from 'next'
import { useFetchPublishedArticles } from '@/hooks/article'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import PublishedArticleList from '@/components/PublishedArticleList'

const PublishedArticlesPage: NextPage = () => {
  const { isFetching } = useFetchPublishedArticles()

  return (
    <Layout title='Articles'>
      {isFetching && <Loading />}
      {!isFetching && <PublishedArticleList />}
    </Layout>
  )
}

export default PublishedArticlesPage

import type { NextPage } from 'next'
import { useFetchMyArticles } from '@/hooks/article'
import { ArticleStatus } from '@/models/Article'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import OwnArticleList from '@/components/OwnArticleList'

const OwnArticlesPage: NextPage = () => {
  const { isFetching: isFetchingPublishedArticles } = useFetchMyArticles(ArticleStatus.Published)
  const { isFetching: isFetchingDraftArticles } = useFetchMyArticles(ArticleStatus.Draft)

  return (
    <Layout title='My Articles'>
      {(isFetchingPublishedArticles || isFetchingDraftArticles) && <Loading />}
      {!(isFetchingPublishedArticles || isFetchingDraftArticles) && <OwnArticleList />}
    </Layout>
  )
}

export default OwnArticlesPage

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFoundContent from '@/components/NotFoundContent'
import { usePublishedArticle } from '@/hooks/article'
import Layout from '@/components/Layout'
import ArticleDetail from '@/components/ArticleDetail'

type QueryParams = {
  docId: FirestoreDocumentId
}

const ArticleDetailPage: NextPage = () => {
  const router = useRouter()
  const { docId } = router.query as QueryParams

  const { isFetching, article } = usePublishedArticle(docId)

  if (isFetching) {
    return <Loading />
  } else if (!article) {
    return <NotFoundContent />
  }

  return (
    <Layout title={article.title}>
      <ArticleDetail article={article} />
    </Layout>
  )
}

export default ArticleDetailPage

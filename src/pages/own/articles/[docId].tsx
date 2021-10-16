import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useMyArticle } from '@/hooks/article'
import Loading from '@/components/Loading'
import NotFoundContent from '@/components/NotFoundContent'
import ArticleDetail from '@/components/ArticleDetail'

type QueryParams = {
  docId: FirestoreDocumentId
}

const OwnArticleDetailPage: NextPage = () => {
  const router = useRouter()
  const { docId } = router.query as QueryParams

  const { isFetching, article } = useMyArticle(docId)

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

export default OwnArticleDetailPage

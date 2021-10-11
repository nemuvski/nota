import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import ArticleForm from '@/components/ArticleForm'
import PageTitle from '@/styles/styled-components/page-title.component'
import { useMyArticle } from '@/hooks/article'
import { useRouter } from 'next/router'
import Loading from '@/components/Loading'
import NotFoundContent from '@/components/NotFoundContent'

type QueryParams = {
  docId: FirestoreDocumentId
}

const EditArticlePage: NextPage = () => {
  const router = useRouter()
  const { docId } = router.query as QueryParams

  const { isFetching, article } = useMyArticle(docId)

  if (isFetching) {
    return <Loading />
  } else if (!article) {
    return <NotFoundContent />
  }

  return (
    <Layout title='Edit Article'>
      <PageTitle>Edit Article</PageTitle>
      <ArticleForm article={article} />
    </Layout>
  )
}

export default EditArticlePage

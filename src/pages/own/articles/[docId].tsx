import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMyArticle } from '@/hooks/article'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NotFoundContent from '@/components/NotFoundContent'
import ArticleDetail from '@/components/ArticleDetail'
import Styles from '@/styles/own-article-detail-page.style'
import Button from '@/styles/styled-components/button.component'

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

      <div css={Styles.actions}>
        <Button
          type='button'
          color='gray'
          onClick={() => {
            router.replace({
              pathname: '/own/articles/edit/[docId]',
              query: { docId: article.id },
            })
          }}
        >
          Edit
        </Button>
        <Button type='button' color='secondary'>
          Delete
        </Button>
      </div>
    </Layout>
  )
}

export default OwnArticleDetailPage

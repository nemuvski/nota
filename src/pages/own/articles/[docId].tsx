import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMyArticle } from '@/hooks/article'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NotFoundContent from '@/components/NotFoundContent'
import ArticleDetail from '@/components/ArticleDetail'
import Modal from '@/components/Modal'
import Styles from '@/styles/own-article-detail-page.style'
import ButtonList from '@/styles/styled-components/button-list.component'
import Button from '@/styles/styled-components/button.component'
import Paragraph from '@/styles/styled-components/paragraph.component'

type QueryParams = {
  docId: FirestoreDocumentId
}

const OwnArticleDetailPage: NextPage = () => {
  const router = useRouter()
  const { docId } = router.query as QueryParams

  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <Button type='button' color='secondary' onClick={() => setIsModalOpen(true)}>
          Delete
        </Button>
      </div>

      {isModalOpen && (
        <Modal closeAction={() => setIsModalOpen(false)}>
          <Paragraph alignment='center'>Are you sure to delete this article?</Paragraph>
          <ButtonList alignment='center'>
            <Button type='button' color='gray' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type='button' color='secondary'>
              Delete
            </Button>
          </ButtonList>
        </Modal>
      )}
    </Layout>
  )
}

export default OwnArticleDetailPage

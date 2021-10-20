import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { BsListStars } from 'react-icons/bs'
import { FRONT_PAGE_NUM_ARTICLES } from '@/constants/article'
import { useFetchPublishedArticles } from '@/hooks/article'
import Loading from '@/components/Loading'
import Button from '@/styles/styled-components/button.component'
import ButtonIcon from '@/styles/styled-components/button-icon.component'
import Paragraph from '@/styles/styled-components/paragraph.component'
import PublishedArticleList from '@/components/PublishedArticleList'

const HomePage: NextPage = () => {
  const router = useRouter()

  const { isFetching } = useFetchPublishedArticles(FRONT_PAGE_NUM_ARTICLES)

  return (
    <Layout>
      {isFetching && <Loading />}

      {!isFetching && (
        <>
          <PublishedArticleList numArticles={FRONT_PAGE_NUM_ARTICLES} />
          <Paragraph alignment='center'>
            <Button type='button' color='primary' onClick={() => router.push('/articles')}>
              <ButtonIcon>
                <BsListStars />
              </ButtonIcon>
              Article list
            </Button>
          </Paragraph>
        </>
      )}
    </Layout>
  )
}

export default HomePage

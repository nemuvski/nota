import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BsListStars, BsPencilSquare } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { DASHBOARD_PAGE_NUM_ARTICLES } from '@/constants/article'
import { useFetchMyArticles } from '@/hooks/article'
import { ArticleStatus } from '@/models/Article'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import OwnArticleList from '@/components/OwnArticleList'
import Button from '@/styles/styled-components/button.component'
import ButtonList from '@/styles/styled-components/button-list.component'
import ButtonIcon from '@/styles/styled-components/button-icon.component'
import Paragraph from '@/styles/styled-components/paragraph.component'

const DashboardIndexPage: NextPage = () => {
  const router = useRouter()

  // 表示分の記事を取得
  const { isFetching: isFetchingPublishedArticles } = useFetchMyArticles(
    ArticleStatus.Published,
    DASHBOARD_PAGE_NUM_ARTICLES
  )
  const { isFetching: isFetchingDraftArticles } = useFetchMyArticles(ArticleStatus.Draft, DASHBOARD_PAGE_NUM_ARTICLES)

  return (
    <Layout title='Dashboard'>
      {(isFetchingPublishedArticles || isFetchingDraftArticles) && <Loading />}

      <ButtonList alignment='right'>
        <Button type='button' color='primary' onClick={() => router.push('/own/articles/create')}>
          <ButtonIcon>
            <BsPencilSquare />
          </ButtonIcon>
          Create Article
        </Button>
        <Button type='button' color='gray' onClick={() => router.push('/settings')}>
          <ButtonIcon>
            <IoSettingsOutline />
          </ButtonIcon>
          Settings
        </Button>
      </ButtonList>

      {!(isFetchingPublishedArticles || isFetchingDraftArticles) && (
        <>
          <OwnArticleList numArticles={DASHBOARD_PAGE_NUM_ARTICLES} />
          <Paragraph alignment='center'>
            <Button type='button' color='primary' onClick={() => router.push('/own/articles')}>
              <ButtonIcon>
                <BsListStars />
              </ButtonIcon>
              My article list
            </Button>
          </Paragraph>
        </>
      )}
    </Layout>
  )
}

export default DashboardIndexPage

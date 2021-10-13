import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BsPencilSquare } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import { DASHBOARD_PAGE_NUM_ARTICLES } from '@/constants/article'
import { useFetchMyArticles } from '@/hooks/article'
import { ArticleStatus } from '@/models/Article'
import Layout from '@/components/Layout'
import Button from '@/styles/styled-components/button.component'
import ButtonList from '@/styles/styled-components/button-list.component'
import ButtonIcon from '@/styles/styled-components/button-icon.component'
import Loading from '@/components/Loading'
import DashboardArticleList from '@/components/DashboardArticleList'

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

      {!(isFetchingPublishedArticles || isFetchingDraftArticles) && <DashboardArticleList />}
    </Layout>
  )
}

export default DashboardIndexPage

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/stores/store'
import { selectMyArticles } from '@/stores/article/selector'
import { clearArticles } from '@/stores/article/slice'
import { ArticleStatus } from '@/models/Article'
import { logOut } from '@/infrastructure/auth'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'

const LogoutPage: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const draftArticles = useSelector(selectMyArticles(ArticleStatus.Draft))

  useEffect(() => {
    // 下書きArticleエンティティをストアからクリア
    dispatch(clearArticles(draftArticles.map((article) => article.id)))

    logOut().finally(() => {
      router.replace('/')
    })
  }, [dispatch, router, draftArticles])

  return (
    <Layout title='Log out'>
      <Loading />
    </Layout>
  )
}

export default LogoutPage

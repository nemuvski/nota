import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/stores/store'
import { selectMyArticle } from '@/stores/article/selector'
import { ArticleStatusType } from '@/models/Article'
import { getMyArticleAction, getMyArticlesAction } from '@/stores/article/action'
import { selectMyAccount } from '@/stores/account/selector'

/**
 * 所有するArticleを取得する
 *
 * @param docId
 */
export const useMyArticle = (docId: FirestoreDocumentId) => {
  const dispatch = useDispatch<AppDispatch>()
  const article = useSelector(selectMyArticle(docId))
  const myAccount = useSelector(selectMyAccount)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (article || !myAccount) {
      return
    }

    const fetchMyArticle = async () => await dispatch(getMyArticleAction({ id: docId, uid: myAccount.uid })).unwrap()

    setIsFetching(true)
    fetchMyArticle().finally(() => setIsFetching(false))
  }, [dispatch, docId, myAccount, article])

  return {
    isFetching,
    article,
  }
}

/**
 * 所有するArticle群を取得する
 *
 * @param status
 * @param size
 */
export const useFetchMyArticles = (status?: ArticleStatusType, size?: number) => {
  const dispatch = useDispatch<AppDispatch>()
  const myAccount = useSelector(selectMyAccount)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (!myAccount) {
      return
    }

    const fetchMyArticles = async () =>
      await dispatch(getMyArticlesAction({ ownerUid: myAccount.uid, status, limitNumber: size })).unwrap()

    setIsFetching(true)
    fetchMyArticles().finally(() => setIsFetching(false))
  }, [dispatch, myAccount, status, size])

  return { isFetching }
}

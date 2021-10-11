import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/stores/store'
import { selectMyArticle } from '@/stores/article/selector'
import { useEffect, useState } from 'react'
import { getMyArticleAction } from '@/stores/article/action'
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

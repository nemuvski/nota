import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/stores/store'
import { selectAccount } from '@/stores/account/selector'
import { getAccountAction } from '@/stores/account/action'

/**
 * Accountを取得する
 *
 * @param uid
 */
export const useAccount = (uid: AuthUid) => {
  const dispatch = useDispatch<AppDispatch>()
  const account = useSelector(selectAccount(uid))
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (account) {
      return
    }

    const fetchAccount = async () => await dispatch(getAccountAction(uid)).unwrap()

    setIsFetching(true)
    fetchAccount().finally(() => setIsFetching(false))
  }, [dispatch, uid, account])

  return {
    isFetching,
    account,
  }
}

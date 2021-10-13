import { createSelector } from '@reduxjs/toolkit'
import { accountAdapter } from '@/stores/account/slice'
import { RootState } from '@/stores/store'
import { selectAuth } from '@/stores/auth/selector'

const accountState = (state: RootState) => state.account
const { selectById } = accountAdapter.getSelectors()

/**
 * ストアから指定したAccountを取得
 *
 * @param uid
 */
export const selectAccount = (uid: AuthUid) => createSelector(accountState, (state) => selectById(state, uid))

/**
 * ストアから自分自身のAccountを取得
 */
export const selectMyAccount = createSelector(accountState, selectAuth, (accountState, authUser) => {
  if (!authUser || !authUser.uid) return undefined
  return selectById(accountState, authUser.uid)
})

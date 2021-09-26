import { createSelector } from '@reduxjs/toolkit'
import { accountAdapter } from '@/stores/account/slice'
import { RootState } from '@/stores/store'
import { selectAuth } from '@/stores/auth/selector'

const selectors = accountAdapter.getSelectors()

/**
 * ストアから全件のAccountを取得
 */
export const selectAllAccounts = (state: RootState) => selectors.selectAll(state.account)

/**
 * ストアから指定したAccountを取得
 *
 * @param uid
 */
export const selectAccount = (uid: AuthUid) => (state: RootState) => selectors.selectById(state.account, uid)

/**
 * ストアから自分自身のAccountを取得
 */
export const selectMyAccount = createSelector(
  (state: RootState) => state.account,
  selectAuth,
  (accountState, authUser) => {
    if (!authUser || !authUser.uid) return undefined
    return selectors.selectById(accountState, authUser.uid)
  }
)

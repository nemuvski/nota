import { accountAdapter } from '@/stores/account/slice'
import { RootState } from '@/stores/store'

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

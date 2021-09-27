import { RootState } from '@/stores/store'
import { toastAdapter } from '@/stores/toast/slice'
import { createSelector } from '@reduxjs/toolkit'

const toastState = (state: RootState) => state.toast
const { selectAll, selectById } = toastAdapter.getSelectors()

/**
 * ストアから全件のToastContentを取得
 */
export const selectAllToasts = createSelector(toastState, selectAll)

/**
 * ストアから指定したToastContentを取得
 *
 * @param id
 */
export const selectToast = (id: string) => createSelector(toastState, (state) => selectById(state, id))

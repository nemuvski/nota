import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ToastContent } from '@/models/Toast'

export const toastAdapter = createEntityAdapter<ToastContent>({
  selectId: (toast) => toast.id,
  // 作成日時について降順 (新しいToastが上に表示されるようにするため)
  sortComparer: (a, b) => b.createdAt.diff(a.createdAt),
})

export const toastSlice = createSlice({
  name: 'toast',
  initialState: toastAdapter.getInitialState(),
  reducers: {
    addToast: (state, action: PayloadAction<ToastContent>) => {
      if (action.payload) {
        toastAdapter.addOne(state, action.payload)
      }
    },
    removeToast: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        toastAdapter.removeOne(state, action.payload)
      }
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions

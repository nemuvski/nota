import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { toastSlice } from '@/stores/toast/slice'
import { authSlice } from '@/stores/auth/slice'
import { accountSlice } from '@/stores/account/slice'
import { articleSlice } from '@/stores/article/slice'

export const store = configureStore({
  reducer: {
    [toastSlice.name]: toastSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [articleSlice.name]: articleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authSlice } from '@/stores/auth/slice'
import { accountSlice } from '@/stores/account/slice'

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

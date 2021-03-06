import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthUser } from '@/models/AuthUser'

export interface AuthState {
  user: AuthUser | null
}

const initialState: AuthState = { user: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
    },
  },
})

export const { setAuth } = authSlice.actions

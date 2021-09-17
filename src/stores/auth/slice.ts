import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'firebase/auth'

export interface AuthState {
  user: User | null
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

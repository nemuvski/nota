import { RootState } from '@/stores/store'

export const selectAuth = (state: RootState) => state.authReducer.user

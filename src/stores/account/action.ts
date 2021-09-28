import { createAsyncThunk } from '@reduxjs/toolkit'
import { addAccount, getAccount, updateAccount } from '@/infrastructure/account'

export const getAccountAction = createAsyncThunk('account/getAccount', async (uid: AuthUid) => {
  return await getAccount(uid)
})

export const addAccountAction = createAsyncThunk('account/addAccount', async (uid: AuthUid) => {
  return await addAccount(uid)
})

export const updateAccountAction = createAsyncThunk(
  'account/updateAccount',
  async (params: { uid: AuthUid; displayName: string; avatarUrl?: string }) => {
    const { uid, displayName, avatarUrl } = params
    return await updateAccount(uid, displayName, avatarUrl)
  }
)

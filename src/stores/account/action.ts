import { createAsyncThunk } from '@reduxjs/toolkit'
import { addAccount, getAccount } from '@/infrastructure/account'

export const addAccountAction = createAsyncThunk('account/addAccount', async (uid: AuthUid, { rejectWithValue }) => {
  try {
    return await addAccount(uid)
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getAccountAction = createAsyncThunk('account/getAccount', async (uid: AuthUid, { rejectWithValue }) => {
  try {
    return await getAccount(uid)
  } catch (error) {
    return rejectWithValue(error)
  }
})

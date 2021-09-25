import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Account } from '@/models/Account'
import { addAccountAction, getAccountAction } from '@/stores/account/action'

export const accountAdapter = createEntityAdapter<Account>({
  selectId: (account) => account.id,
  sortComparer: (a, b) => a.createdAt.diff(b.createdAt),
})

export const accountSlice = createSlice({
  name: 'account',
  initialState: accountAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addAccountAction.fulfilled, (state, action) => {
      if (action.payload) {
        accountAdapter.addOne(state, action.payload)
      }
    })

    builder.addCase(getAccountAction.fulfilled, (state, action) => {
      if (action.payload) {
        accountAdapter.addOne(state, action.payload)
      }
    })
  },
})

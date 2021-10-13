import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Account } from '@/models/Account'
import { addAccountAction, getAccountAction, updateAccountAction } from '@/stores/account/action'

export const accountAdapter = createEntityAdapter<Account>({
  selectId: (account) => account.id,
  sortComparer: (a, b) => b.updatedAt.diff(a.updatedAt),
})

export const accountSlice = createSlice({
  name: 'account',
  initialState: accountAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountAction.fulfilled, (state, action) => {
      if (action.payload) {
        accountAdapter.addOne(state, action.payload)
      }
    })

    builder.addCase(addAccountAction.fulfilled, (state, action) => {
      if (action.payload) {
        accountAdapter.addOne(state, action.payload)
      }
    })

    builder.addCase(updateAccountAction.fulfilled, (state, action) => {
      if (action.payload) {
        accountAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
      }
    })
  },
})

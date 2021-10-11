import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Article } from '@/models/Article'
import { addArticleAction, updateArticleAction } from '@/stores/article/action'

export const articleAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
  sortComparer: (a, b) => a.createdAt.diff(b.createdAt),
})

export const articleSlice = createSlice({
  name: 'article',
  initialState: articleAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addArticleAction.fulfilled, (state, action) => {
      if (action.payload) {
        articleAdapter.addOne(state, action.payload)
      }
    })

    builder.addCase(updateArticleAction.fulfilled, (state, action) => {
      if (action.payload) {
        articleAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
      }
    })
  },
})

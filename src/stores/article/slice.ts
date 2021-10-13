import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { Article } from '@/models/Article'
import { addArticleAction, getMyArticleAction, getMyArticlesAction, updateArticleAction } from '@/stores/article/action'

export const articleAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
  sortComparer: (a, b) => b.updatedAt.diff(a.updatedAt),
})

export const articleSlice = createSlice({
  name: 'article',
  initialState: articleAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyArticleAction.fulfilled, (state, action) => {
      if (action.payload) {
        articleAdapter.upsertOne(state, action.payload)
      }
    })

    builder.addCase(getMyArticlesAction.fulfilled, (state, action) => {
      articleAdapter.upsertMany(state, action.payload)
    })

    builder.addCase(addArticleAction.fulfilled, (state, action) => {
      if (action.payload) {
        articleAdapter.addOne(state, action.payload)
      }
    })

    builder.addCase(updateArticleAction.fulfilled, (state, action) => {
      if (action.payload) {
        articleAdapter.upsertOne(state, action.payload)
      }
    })
  },
})

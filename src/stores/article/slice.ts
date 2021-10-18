import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Article } from '@/models/Article'
import {
  addArticleAction,
  deleteArticleAction,
  getMyArticleAction,
  getMyArticlesAction,
  updateArticleAction,
} from '@/stores/article/action'

export const articleAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id,
  sortComparer: (a, b) => b.updatedAt.diff(a.updatedAt),
})

export const articleSlice = createSlice({
  name: 'article',
  initialState: articleAdapter.getInitialState(),
  reducers: {
    clearArticles: (state, actions: PayloadAction<Array<FirestoreDocumentId>>) => {
      articleAdapter.removeMany(state, actions.payload)
    },
  },
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

    builder.addCase(deleteArticleAction.fulfilled, (state, action) => {
      if (action.payload) {
        articleAdapter.removeOne(state, action.payload)
      }
    })
  },
})

export const { clearArticles } = articleSlice.actions

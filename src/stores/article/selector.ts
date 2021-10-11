import { RootState } from '@/stores/store'
import { articleAdapter } from '@/stores/article/slice'
import { createSelector } from '@reduxjs/toolkit'
import { ArticleStatus } from '@/models/Article'
import { selectAuth } from '@/stores/auth/selector'

const articleState = (state: RootState) => state.article
const { selectById } = articleAdapter.getSelectors()

/**
 * ストアから自身の所有するArticleを取得
 *
 * @param docId
 */
export const selectMyArticle = (docId: FirestoreDocumentId) =>
  createSelector(articleState, selectAuth, (articleState, authUser) => {
    if (!authUser || !authUser.uid) return undefined
    const targetArticle = selectById(articleState, docId)
    // 自身のもの、かつステータスが削除でなければ返す
    if (
      targetArticle &&
      targetArticle.ownerUid === authUser.uid &&
      (targetArticle.status === ArticleStatus.Draft || targetArticle.status === ArticleStatus.Published)
    ) {
      return targetArticle
    }
    return undefined
  })

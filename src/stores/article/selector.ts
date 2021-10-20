import { RootState } from '@/stores/store'
import { articleAdapter } from '@/stores/article/slice'
import { createSelector } from '@reduxjs/toolkit'
import { ArticleStatus, ArticleStatusType } from '@/models/Article'
import { selectAuth } from '@/stores/auth/selector'

const articleState = (state: RootState) => state.article
const { selectAll, selectById } = articleAdapter.getSelectors()

/**
 * ストアから指定した公開済のArticleを取得
 *
 * @param docId
 */
export const selectPublishedArticle = (docId: FirestoreDocumentId) =>
  createSelector(articleState, (state) => {
    const targetArticle = selectById(state, docId)
    if (targetArticle && targetArticle.status === ArticleStatus.Published) {
      return targetArticle
    }
    return undefined
  })

/**
 * ストアから交際済のArticle群を取得
 *
 * @param size
 */
export const selectPublishedArticles = (size?: number) =>
  createSelector(articleState, (state) => {
    const targetArticles = selectAll(state).filter((article) => article.status === ArticleStatus.Published)

    // サイズが指定されている場合は個数を制限する
    if (size && size > 0) {
      return targetArticles.slice(0, size)
    }

    return targetArticles
  })

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

/**
 * ストアから自身の所有するArticle群を取得する
 *
 * @param status
 * @param size
 */
export const selectMyArticles = (status?: ArticleStatusType, size?: number) =>
  createSelector(articleState, selectAuth, (articleState, authUser) => {
    if (!authUser || !authUser.uid) return []
    const targetArticles = selectAll(articleState).filter((article) => {
      if (article.ownerUid !== authUser.uid) {
        return false
      }
      // ステータスが指定されている場合は評価する
      if (status) {
        return article.status === status
      }
      return true
    })

    // サイズが指定されている場合は個数を制限する
    if (size && size > 0) {
      return targetArticles.slice(0, size)
    }

    return targetArticles
  })

import { createAsyncThunk } from '@reduxjs/toolkit'
import { RawDraftContentState } from 'draft-js'
import { addArticle, getMyArticle, updateArticle } from '@/infrastructure/article'
import { ArticleStatusType } from '@/models/Article'

interface AddPayloadParams {
  ownerUid: AuthUid
  title: string
  body: RawDraftContentState
  status: ArticleStatusType
  thumbnailUrl?: string
}

interface UpdatePayloadParams extends AddPayloadParams {
  id: FirestoreDocumentId
}

export const getMyArticleAction = createAsyncThunk(
  'article/getMyArticle',
  async ({ id, uid }: { id: FirestoreDocumentId; uid: AuthUid }) => {
    return await getMyArticle(id, uid)
  }
)

export const addArticleAction = createAsyncThunk(
  'article/addArticle',
  async ({ ownerUid, title, body, status, thumbnailUrl }: AddPayloadParams) => {
    return await addArticle(ownerUid, title, body, status, thumbnailUrl)
  }
)

export const updateArticleAction = createAsyncThunk(
  'article/updateArticle',
  async ({ id, ownerUid, title, body, status, thumbnailUrl }: UpdatePayloadParams) => {
    return await updateArticle(id, ownerUid, title, body, status, thumbnailUrl)
  }
)

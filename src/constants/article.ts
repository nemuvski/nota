import { RawDraftContentState } from 'draft-js'

/**
 * サムネイル画像のアスペクト比
 */
export const THUMBNAIL_ASPECT_RATIO = 16 / 9

/**
 * Titleフィールドの最大文字数
 */
export const MAX_LENGTH_TITLE = 120

/**
 * Bodyフィールドの初期値
 */
export const INITIAL_BODY_CONTENT: RawDraftContentState = {
  blocks: [],
  entityMap: {},
}

/**
 * ダッシュボードページで表示する記事数
 */
export const DASHBOARD_PAGE_NUM_ARTICLES = 6

/**
 * フロントページで表示する記事数
 */
export const FRONT_PAGE_NUM_ARTICLES = 12

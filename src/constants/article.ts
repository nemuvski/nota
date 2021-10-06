import { RawDraftContentState } from 'draft-js'

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

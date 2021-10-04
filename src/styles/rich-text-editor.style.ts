import { css } from '@emotion/react'

const root = css`
  width: 100%;
`

const actions = css`
  margin: 0 0 0.75rem;
  padding: 0;
  list-style-type: none;
`

const editor = css`
  overflow-y: auto;
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-gray-dark);
  border-radius: 0.3rem;
`

// draft-jsで付与されるクラス
const draftEditorStyles = css`
  .DraftEditor-root {
    width: 100%;
    height: 12rem;
    // フォントサイズは固定
    font-size: 16px;
    line-height: 1.6;
  }
`

const styles = {
  root,
  actions,
  editor,
  draftEditorStyles,
}

export default styles

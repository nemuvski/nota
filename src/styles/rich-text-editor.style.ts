import { css } from '@emotion/react'
import { bp, Breakpoint } from '@/styles/mixins/breakpoints.mixin'

const root = css`
  width: 100%;
`

const actions = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0.75rem 0 0.25rem;
  padding: 0;
  list-style-type: none;

  > li {
    margin-bottom: 0.5rem;

    &:not(:last-of-type) {
      margin-right: 0.5rem;
    }
  }
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
    height: 16rem;
    // フォントサイズは固定
    font-size: 16px;
    line-height: 1.6;

    ${bp(Breakpoint.M_MIN)} {
      height: 24rem;
    }
  }
`

const styles = {
  root,
  actions,
  editor,
  draftEditorStyles,
}

export default styles

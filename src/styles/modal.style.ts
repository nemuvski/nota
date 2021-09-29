import { css } from '@emotion/react'

const root = css`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow: hidden auto;
  display: flex;
  align-items: center;
  padding: 3rem 0.75rem;
  background-color: var(--color-overlay);
`

const inner = css`
  max-width: 600px;
  width: 100%;
  margin: auto;
`

const close = css`
  color: var(--color-back);
  font-size: 0.9rem;
  text-align: right;
`

const icon = css`
  width: 1.2rem;
  height: 1.2rem;
`

const content = css`
  padding: 1.25rem;
  border-radius: 0.3rem;
  background-color: var(--color-back);
`

const styles = {
  root,
  inner,
  close,
  icon,
  content,
}

export default styles

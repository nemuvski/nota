import { css } from '@emotion/react'

const root = css`
  overflow: hidden;
  border-radius: 0.3rem;
`

const inner = css`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: var(--color-text);

  &:hover {
    text-decoration: none;
    background-color: var(--color-gray-light);
  }
`

const info = css`
  padding: 1rem 0.5rem;
  font-size: 0.8rem;
  word-break: break-all;
`

const date = css`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const dateIcon = css`
  width: 1rem;
`

const title = css`
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
  font-weight: normal;
`

const styles = {
  root,
  inner,
  info,
  date,
  dateIcon,
  title,
}

export default styles

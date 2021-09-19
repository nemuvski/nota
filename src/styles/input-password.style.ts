import { css } from '@emotion/react'

const root = css`
  position: relative;
`

const input = css`
  padding-right: 3rem;
`

const button = css`
  position: absolute;
  z-index: 5;
  top: 50%;
  right: 0.5rem;
  display: block;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  transform: translateY(-50%);
`

const styles = {
  root,
  input,
  button,
}

export default styles

import { css } from '@emotion/react'

const root = css`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
`

const field = css`
  margin-bottom: 1.25rem;
`

const fieldLabel = css`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: bold;
`

const fieldInput = css`
  display: block;
  width: 100%;
`

const fieldInputError = css`
  border-color: var(--color-secondary-main);
  background-color: var(--color-secondary-light);
  color: var(--color-secondary-main);
`

const actions = css`
  margin-top: 1.5rem;
  text-align: center;
`

const styles = {
  root,
  field,
  fieldLabel,
  fieldInput,
  fieldInputError,
  actions,
}

export default styles

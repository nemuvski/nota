import { css } from '@emotion/react'

const menu = css`
  margin: 0;
  padding: 0;
  list-style-type: none;

  li {
    width: 100%;
    margin-top: 1.25rem;
    text-align: center;
  }

  button {
    width: 100%;
    max-width: 320px;
  }
`

const icon = css`
  width: 1.25rem;
  margin-right: 0.5rem;
`

const styles = {
  menu,
  icon,
}

export default styles

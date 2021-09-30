import { css } from '@emotion/react'

const root = css`
  position: relative;
  width: 100%;
`

const setContainerHeight = (height: number) => css`
  height: ${height}px;
`

const styles = {
  root,
  setContainerHeight,
}

export default styles

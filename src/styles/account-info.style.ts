import { css } from '@emotion/react'

const root = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`
const rootVariant = css`
  gap: 0.4rem;
`

const avatar = css`
  width: 1.8rem;
`
const avatarVariant = css`
  width: 1.6rem;
`

const name = css`
  flex: 1 1 auto;
  font-size: 0.9rem;
`
const nameVariant = css`
  font-size: 0.8rem;
`

const styles = {
  root,
  rootVariant,
  avatar,
  avatarVariant,
  name,
  nameVariant,
}

export default styles

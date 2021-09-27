import { css } from '@emotion/react'

const root = css`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 375px;
  padding: 0.6rem 0.8rem;
  border-radius: 0.3rem;
  background-color: var(--color-info-light);
  opacity: 0.9;
`

const rootVariant = (level: Level) => css`
  background-color: ${`var(--color-${level}-main)`};
  color: ${`var(--color-${level}-light)`};
`

const icon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1.4rem;
  height: 1.4rem;
  margin-right: 0.75rem;
`

const content = css`
  flex: 1 1 auto;
  font-size: 0.9rem;
`

const styles = {
  root,
  rootVariant,
  icon,
  content,
}

export default styles

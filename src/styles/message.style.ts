import { css } from '@emotion/react'

const root = css`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  padding: 0.6rem 0.8rem;
  border-radius: 0.3rem;
  background-color: var(--color-info-light);
  line-height: 1.5;
`

const rootVariant = (level: Level) => css`
  background-color: ${`var(--color-${level}-light)`};
`

const icon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 1.4rem;
  height: 1.4rem;
  margin-right: 0.75rem;
  color: var(--color-info-main);
`

const iconVariant = (level: Level) => css`
  color: ${`var(--color-${level}-main)`};
`

const content = css`
  flex: 1 1 auto;
  font-size: 0.9rem;
  color: var(--color-info-dark);
`

const contentVariant = (level: Level) => css`
  color: ${`var(--color-${level}-dark)`};
`

const styles = {
  root,
  rootVariant,
  icon,
  iconVariant,
  content,
  contentVariant,
}

export default styles

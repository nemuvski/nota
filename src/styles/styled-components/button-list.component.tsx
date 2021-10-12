import { css } from '@emotion/react'
import styled from '@emotion/styled'

type Props = {
  alignment?: 'left' | 'center' | 'right'
}

const ButtonList = styled.div<Props>(
  css`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;

    > button {
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;

      &:not(:last-of-type) {
        margin-right: 0.5rem;
      }
    }
  `,
  ({ alignment = 'left' }) => css`
    justify-content: ${alignment};
  `
)

export default ButtonList

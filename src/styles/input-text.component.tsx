import { css } from '@emotion/react'
import styled from '@emotion/styled'

type Props = {
  isError?: boolean
}

const InputText = styled.input<Props>(
  css`
    display: block;
    width: 100%;
    padding: 0.3rem 0.6rem;
    border: 2px solid var(--color-gray-dark);
    border-radius: 0.3rem;
    // フォントサイズは固定
    font-size: 16px;
    line-height: 1.6;
  `,
  ({ isError = false }) =>
    isError
      ? css`
          border-color: var(--color-secondary-main);
          background-color: var(--color-secondary-light);
          color: var(--color-secondary-main);
        `
      : null
)

export default InputText

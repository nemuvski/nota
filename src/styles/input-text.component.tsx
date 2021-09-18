import { css } from '@emotion/react'
import styled from '@emotion/styled'

const InputText = styled.input(css`
  padding: 0.3rem 0.6rem;
  border: 2px solid var(--color-gray-dark);
  border-radius: 0.3rem;
  // フォントサイズは固定
  font-size: 16px;
  line-height: 1.6;
`)

export default InputText

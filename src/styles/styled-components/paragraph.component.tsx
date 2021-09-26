import { css } from '@emotion/react'
import styled from '@emotion/styled'

type Props = {
  alignment?: 'left' | 'center' | 'right'
}

const Paragraph = styled.p<Props>(
  ({ alignment = 'left' }) => css`
    text-align: ${alignment};
  `
)

export default Paragraph

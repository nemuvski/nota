import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Avatar = styled.img(css`
  display: block;
  border-radius: 50%;
`)

Avatar.defaultProps = {
  alt: 'Avatar',
}

export default Avatar

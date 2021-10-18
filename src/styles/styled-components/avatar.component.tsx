import { css } from '@emotion/react'
import styled from '@emotion/styled'

const Avatar = styled.img(css`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1;
  background-color: var(--color-gray-main);
`)

Avatar.defaultProps = {
  alt: 'Your Avatar Image',
  src: '/assets/avatar-placeholder.png',
}

export default Avatar

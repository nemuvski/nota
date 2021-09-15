import React from 'react'
import Styles from '@/styles/header.style'
import InnerContainer from '@/components/InnerContainer'

const Header: React.FC = () => {
  return (
    <>
      <header css={Styles.header}>
        <InnerContainer>
          <h1 css={Styles.headerTitle}>Nota</h1>
        </InnerContainer>
      </header>
      <div css={Styles.spacer} />
    </>
  )
}

export default Header

import React from 'react'
import Styles from '@/styles/header.style'
import InnerContainer from '@/components/InnerContainer'
import { useScrollOver } from '@/hooks/useScrollOver'
import HeaderAction from '@/components/HeaderAction'

const SCROLL_THRESHOLD_Y = 40

const Header: React.FC = () => {
  const isScrollOver = useScrollOver(SCROLL_THRESHOLD_Y)

  return (
    <>
      <header css={[Styles.header, isScrollOver && Styles.isScrolled]}>
        <InnerContainer isWide={!isScrollOver}>
          <div css={Styles.headerInner}>
            <h1 css={Styles.headerTitle}>Nota</h1>
            <HeaderAction />
          </div>
        </InnerContainer>
      </header>
      <div css={Styles.spacer} />
    </>
  )
}

export default Header

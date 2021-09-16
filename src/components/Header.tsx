import React from 'react'
import Link from 'next/link'
import Styles from '@/styles/header.style'
import InnerContainer from '@/components/InnerContainer'
import { useScrollOver } from '@/hooks/useScrollOver'
import HeaderNavigation from '@/components/HeaderNavigation'

const SCROLL_THRESHOLD_Y = 80

const Header: React.FC = () => {
  const isScrollOver = useScrollOver(SCROLL_THRESHOLD_Y)

  return (
    <>
      <header css={[Styles.header, isScrollOver && Styles.isScrolled]}>
        <InnerContainer size='large'>
          <div css={Styles.headerInner}>
            <Link href='/'>
              <a>
                <h1 css={Styles.headerTitle}>Nota</h1>
              </a>
            </Link>
            <HeaderNavigation />
          </div>
        </InnerContainer>
      </header>
      <div css={Styles.spacer} />
    </>
  )
}

export default Header

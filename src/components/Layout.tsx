import React from 'react'
import Header from '@/components/Header'
import InnerContainer from '@/components/InnerContainer'
import Styles from '@/styles/layout.style'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        <InnerContainer>{children}</InnerContainer>
      </main>
      <footer css={Styles.footer}>
        <small>© 2021 Nota</small>
      </footer>
    </div>
  )
}

export default Layout

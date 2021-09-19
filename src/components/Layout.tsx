import React from 'react'
import { NextSeo } from 'next-seo'
import Header from '@/components/Header'
import InnerContainer from '@/components/InnerContainer'
import Styles from '@/styles/layout.style'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <NextSeo title={title} />

      <Header />
      <main css={Styles.main}>
        <InnerContainer>{children}</InnerContainer>
      </main>
      <footer css={Styles.footer}>
        <small>© 2021 Nota</small>
      </footer>
    </>
  )
}

export default Layout

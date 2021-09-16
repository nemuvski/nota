import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Global } from '@emotion/react'
import Styles from '@/styles/global.style'

import 'modern-css-reset'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <DefaultSeo
        titleTemplate='%s | Nota'
        defaultTitle='Nota - Sharing your notes 🗒'
        additionalMetaTags={[
          {
            name: 'description',
            content: 'This application is for sharing notes.',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.ico',
          },
        ]}
      />

      <Global styles={Styles} />

      <Component {...pageProps} />
    </>
  )
}

export default App

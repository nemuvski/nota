import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Global } from '@emotion/react'
import Styles from '@/styles/global.style'

import 'modern-css-reset'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Nota - Sharing your notes 🗒</title>
        <meta name='description' content='This application is for sharing notes.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Global styles={Styles} />

      <Component {...pageProps} />
    </>
  )
}

export default App

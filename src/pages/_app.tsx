import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Global } from '@emotion/react'
import { Provider } from 'react-redux'
import { store } from '@/stores/store'
import { useAuthStateChanged } from '@/hooks/auth'
import Loading from '@/components/Loading'
import ProtectedRoute from '@/components/ProtectedRoute'
import Styles from '@/styles/global.style'

import 'modern-css-reset'

const NotaApp = ({ Component, pageProps, router }: AppProps) => {
  /**
   * ルートコンポーネント
   */
  const RootComponent = () => {
    const isProcessing = useAuthStateChanged()
    return (
      <>
        {isProcessing ? (
          <Loading />
        ) : (
          <ProtectedRoute router={router}>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </>
    )
  }

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
      <Provider store={store}>
        <RootComponent />
        <div id='portal' />
      </Provider>
    </>
  )
}

export default NotaApp

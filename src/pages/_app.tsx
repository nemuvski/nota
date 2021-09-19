import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { Global } from '@emotion/react'
import { Provider } from 'react-redux'
import { store } from '@/stores/store'
import { useAuthStateChanged } from '@/hooks/auth'
import Loading from '@/components/Loading'
import Styles from '@/styles/global.style'

import 'modern-css-reset'

const NotaApp = ({ Component, pageProps }: AppProps) => {
  /**
   * ルートコンポーネント
   */
  const RootComponent = () => {
    const isProcessing = useAuthStateChanged()
    return (
      <>
        {isProcessing && <Loading />}
        <Component {...pageProps} />
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
      </Provider>
    </>
  )
}

export default NotaApp

import React, { useEffect } from 'react'
import Styles from '@/styles/loading.style'

const Loading = () => {
  useEffect(() => {
    // スクロール固定
    const htmlElement = document.documentElement
    htmlElement.setAttribute('style', 'overflow: hidden')
    return () => {
      htmlElement.style['overflow'] = ''
    }
  }, [])

  return (
    <div css={Styles.root}>
      <div css={Styles.animation} />
    </div>
  )
}

export default Loading

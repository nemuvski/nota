import { useEffect, useRef, useState } from 'react'

/**
 * スクロール量がある値を超えているか否かの真偽値を返却する
 *
 * @param thresholdY
 */
export const useScrollOverTrigger = (thresholdY: number) => {
  const [overThreshold, setOverThreshold] = useState(false)
  const isProcessing = useRef(false)

  useEffect(() => {
    const handler = () => {
      if (isProcessing.current) {
        return
      }
      isProcessing.current = true
      requestAnimationFrame(() => {
        setOverThreshold(window.scrollY > thresholdY)
        isProcessing.current = false
      })
    }

    document.addEventListener('scroll', handler, { passive: true })

    return () => {
      document.removeEventListener('scroll', handler)
    }
  }, [thresholdY])

  return overThreshold
}

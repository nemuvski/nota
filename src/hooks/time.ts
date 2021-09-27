import { useEffect, useRef } from 'react'

/**
 * 指定した時間経過後に処理を実行する
 *
 * @param callback
 * @param delay ミリ秒
 */
export const useTimeout = (callback: () => void, delay: number) => {
  const savedCallback = useRef<undefined | (() => void)>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current && savedCallback.current()
    }
    const timeoutId = setTimeout(tick, delay)
    return () => clearTimeout(timeoutId)
  }, [delay])
}

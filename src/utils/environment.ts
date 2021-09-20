/**
 * クライアントサイド（ブラウザ）で実行される場合にTrueを返却する
 */
export const isBrowser = () => typeof window !== 'undefined'

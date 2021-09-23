/**
 * ステートメントのレベル
 */
declare type Level = 'success' | 'info' | 'warning' | 'error'

/**
 * 色
 */
declare type Color = 'primary' | 'secondary'

/**
 * Messageコンポーネントに表示する内容を入れておくオブジェクト
 */
declare type MessageContent = {
  level: Level
  content: string
}

/**
 * Firebase Authenticationで発行されるUIDのエイリアス
 */
declare type AuthUid = string

/**
 * Firestoreで発行されるドキュメントのIDのエイリアス
 */
declare type FirestoreDocumentId = string

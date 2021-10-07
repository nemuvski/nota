import * as fs from 'fs'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { Timestamp } from 'firebase/firestore'

const projectId = 'account-collection-test-project'
let testEnv: RulesTestEnvironment
const firestoreSettings = { ignoreUndefinedProperties: true }

const articleCollection = `/NotaApp/v0/Article`

describe('Article', () => {
  /**
   * テスト環境のセットアップ
   */
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId,
      firestore: {
        host: 'localhost',
        port: 8080,
        rules: fs.readFileSync('firestore.rules', 'utf8'),
      },
    })
  })

  /**
   * 終了後の処理
   */
  afterAll(async () => {
    await testEnv.cleanup()
  })

  /**
   * ダミーデータ投入
   */
  beforeEach(async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const currentTimestamp = Timestamp.now()
      const col = context.firestore().collection(articleCollection)
      await col.doc('article-published').set({
        ownerUid: 'owner-user',
        title: '公開されているArticle',
        body: '{"blocks":[],"entityMap":{}}',
        thumbnailUrl: 'https://placehold.jp/400x400.png',
        status: 'published',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
      await col.doc('article-draft').set({
        ownerUid: 'owner-user',
        title: '下書きArticle',
        body: '{"blocks":[],"entityMap":{}}',
        thumbnailUrl: 'https://placehold.jp/400x400.png',
        status: 'draft',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
      await col.doc('article-removed').set({
        ownerUid: 'owner-user',
        title: '削除されたArticle',
        body: '{"blocks":[],"entityMap":{}}',
        thumbnailUrl: 'https://placehold.jp/400x400.png',
        status: 'removed',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
    })
  })

  /**
   * データクリア
   */
  afterEach(() => {
    testEnv.clearFirestore()
  })

  /**
   * 匿名ユーザー
   */
  describe('Unauthorized User', () => {
    describe('GET', () => {
      test('「published」のドキュメントを取得できる', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertSucceeds(anonymous.firestore().collection(articleCollection).doc('article-published').get())
      })
      test('「draft」のドキュメントを取得できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertFails(anonymous.firestore().collection(articleCollection).doc('article-draft').get())
      })
      test('「removed」のドキュメントを取得できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertFails(anonymous.firestore().collection(articleCollection).doc('article-removed').get())
      })
    })

    describe('CREATE', () => {
      test('ドキュメントを作成できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertFails(anonymous.firestore().collection(articleCollection).add({ ownerUid: 'anonymous-user' }))
      })
    })

    describe('UPDATE', () => {
      test('ドキュメントを更新できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        // 匿名ユーザーはそもそも作成できないので、追加する内容は空とする
        await assertFails(
          anonymous
            .firestore()
            .collection(articleCollection)
            .doc('article-published')
            .set({ title: 'Alice' }, { merge: true })
        )
      })
    })

    describe('DELETE', () => {
      test('ドキュメントを削除できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertFails(anonymous.firestore().collection(articleCollection).doc('user0').delete())
      })
    })
  })

  /**
   * 認証ユーザー
   */
  describe('Authorized User', () => {
    describe('GET', () => {
      test('「published」のドキュメントを取得できる', async () => {
        const ownerUser = testEnv.authenticatedContext('owner-user')
        await assertSucceeds(ownerUser.firestore().collection(articleCollection).doc('article-published').get())
      })
      test('「draft」のドキュメントを取得できる', async () => {
        const ownerUser = testEnv.authenticatedContext('owner-user')
        await assertSucceeds(ownerUser.firestore().collection(articleCollection).doc('article-draft').get())
      })
      test('「draft」のドキュメントを取得できない', async () => {
        const otherUser = testEnv.authenticatedContext('other-user')
        await assertFails(otherUser.firestore().collection(articleCollection).doc('article-draft').get())
      })
      test('「removed」のドキュメントを取得できない', async () => {
        const ownerUser = testEnv.authenticatedContext('owner-user')
        await assertFails(ownerUser.firestore().collection(articleCollection).doc('article-removed').get())
      })
    })
  })

  describe('CREATE', () => {
    test('成功するケース', async () => {
      const ownerUser = testEnv.authenticatedContext('owner-user')
      const targetCol = ownerUser.firestore(firestoreSettings).collection(articleCollection)
      const currentTimestamp = Timestamp.now()
      const base = {
        ownerUid: 'owner-user',
        title: '成功',
        body: '{"blocks":[],"entityMap":{}}',
        thumbnailUrl: 'https://placehold.jp/400x400.png',
        status: 'published',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      }

      await assertSucceeds(targetCol.add(base))
      await assertSucceeds(
        targetCol.add({
          ...base,
          status: 'draft',
        })
      )
      await assertSucceeds(
        targetCol.add({
          ...base,
          title:
            'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE',
        })
      )
      await assertSucceeds(
        targetCol.add({
          ...base,
          thumbnailUrl: undefined,
        })
      )
    })

    test('失敗するケース', async () => {
      const ownerUser = testEnv.authenticatedContext('owner-user')
      const targetCol = ownerUser.firestore(firestoreSettings).collection(articleCollection)
      const currentTimestamp = Timestamp.now()
      const base = {
        ownerUid: 'owner-user',
        title: '失敗',
        body: '{"blocks":[],"entityMap":{}}',
        thumbnailUrl: 'https://placehold.jp/400x400.png',
        status: 'published',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      }

      await assertFails(
        targetCol.add({
          ...base,
          ownerUid: 'other-user',
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          title: undefined,
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          title:
            'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEA',
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          body: undefined,
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          status: undefined,
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          createdAt: undefined,
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          updatedAt: undefined,
        })
      )
      await assertFails(
        targetCol.add({
          ...base,
          status: 'removed',
        })
      )
    })
  })

  describe('UPDATE', () => {
    test('成功するケース', async () => {
      const ownerUser = testEnv.authenticatedContext('owner-user')
      const targetCol = ownerUser.firestore(firestoreSettings).collection(articleCollection)
      const base = {
        ownerUid: 'owner-user',
        title: 'abc',
        body: '{"blocks":[],"entityMap":{}}',
        status: 'published',
        updatedAt: Timestamp.now(),
      }
      await assertSucceeds(
        targetCol.doc('article-published').set({
          ...base,
          title:
            'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE',
        })
      )
      await assertSucceeds(
        targetCol.doc('article-published').set({
          ...base,
          status: 'draft',
        })
      )
      await assertSucceeds(
        targetCol.doc('article-published').set({
          ...base,
          status: 'removed',
        })
      )
      await assertSucceeds(
        targetCol.doc('article-draft').set({
          ...base,
          status: 'published',
        })
      )
      await assertSucceeds(
        targetCol.doc('article-draft').set({
          ...base,
          status: 'removed',
        })
      )
    })

    test('失敗するケース', async () => {
      const ownerUser = testEnv.authenticatedContext('owner-user')
      const targetCol = ownerUser.firestore(firestoreSettings).collection(articleCollection)
      const base = {
        ownerUid: 'owner-user',
        title: 'abc',
        body: '{"blocks":[],"entityMap":{}}',
        updatedAt: Timestamp.now(),
        status: 'published',
      }
      await assertFails(
        targetCol.doc('article-published').set({
          ...base,
          title:
            'ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEA',
        })
      )
      await assertFails(
        targetCol.doc('article-published').set({
          ...base,
          title: undefined,
        })
      )
      await assertFails(
        targetCol.doc('article-published').set({
          ...base,
          body: undefined,
        })
      )
      await assertFails(
        targetCol.doc('article-published').set({
          ...base,
          status: 'NOOO',
        })
      )
      await assertFails(
        targetCol.doc('article-published').set({
          ...base,
          updatedAt: undefined,
        })
      )
    })
  })

  describe('DELETE', () => {
    test('ドキュメントを削除できない', async () => {
      const ownerUser = testEnv.authenticatedContext('owner-user')
      await assertFails(ownerUser.firestore().collection(articleCollection).doc('article-published').delete())
    })
  })
})

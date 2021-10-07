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

const accountCollection = `/NotaApp/v0/Account`

describe('Account', () => {
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
      const col = context.firestore().collection(accountCollection)
      await col.doc('user0').set({
        uid: 'user0',
        displayName: 'John',
        status: 'active',
        createdAt: currentTimestamp,
        updatedAt: currentTimestamp,
      })
      await col.doc('user1').set({
        uid: 'user1',
        displayName: 'Bob',
        status: 'inactive',
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
      test('「active」なドキュメントを取得できる', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertSucceeds(anonymous.firestore().collection(accountCollection).doc('user0').get())
      })
      test('「inactive」なドキュメントを取得できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertFails(anonymous.firestore().collection(accountCollection).doc('user1').get())
      })
    })

    describe('CREATE', () => {
      test('ドキュメントを作成できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        // 匿名ユーザーはそもそも作成できないので、追加する内容は空とする
        await assertFails(anonymous.firestore().collection(accountCollection).add({}))
      })
    })

    describe('UPDATE', () => {
      test('ドキュメントを更新できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        // 匿名ユーザーはそもそも作成できないので、追加する内容は空とする
        await assertFails(
          anonymous
            .firestore()
            .collection(accountCollection)
            .doc('user0')
            .set({ displayName: 'Alice' }, { merge: true })
        )
      })
    })

    describe('DELETE', () => {
      test('ドキュメントを削除できない', async () => {
        const anonymous = testEnv.unauthenticatedContext()
        await assertFails(anonymous.firestore().collection(accountCollection).doc('user0').delete())
      })
    })
  })

  /**
   * 認証ユーザー
   */
  describe('Authorized User', () => {
    describe('GET', () => {
      test('「active」なドキュメントを取得できる', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        await assertSucceeds(testUser.firestore().collection(accountCollection).doc('user0').get())
      })
      test('「inactive」なドキュメントを取得できない', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        await assertFails(testUser.firestore().collection(accountCollection).doc('user1').get())
      })
    })

    describe('CREATE', () => {
      test('ドキュメントを作成できる (uid一致)', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        const currentTimestamp = Timestamp.now()
        await assertSucceeds(
          testUser.firestore().collection(accountCollection).doc('testUser').set({
            uid: 'testUser',
            displayName: 'James',
            status: 'active',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          })
        )
      })
      test('ドキュメントを作成できない (uid不一致)', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        const currentTimestamp = Timestamp.now()
        await assertFails(
          testUser.firestore().collection(accountCollection).doc('testUser').set({
            uid: 'no',
            displayName: 'James',
            status: 'active',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          })
        )
      })
      test('ドキュメントを作成できない (statusがactiveでない)', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        const currentTimestamp = Timestamp.now()
        await assertFails(
          testUser.firestore().collection(accountCollection).doc('testUser').set({
            uid: 'testUser',
            displayName: 'James',
            status: 'inactive',
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
          })
        )
      })
      test('ドキュメントを作成できない (必須項目がない)', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        await assertFails(testUser.firestore().collection(accountCollection).doc('testUser').set({}))
      })
      test('ドキュメントを作成できない (型不一致)', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        await assertFails(
          testUser.firestore().collection(accountCollection).doc('testUser').set({
            uid: 'testUser',
            displayName: 1000,
            status: 'active',
            createdAt: '2021-09-24',
            updatedAt: '2021-09-24',
          })
        )
      })
    })

    describe('UPDATE', () => {
      test('ドキュメントを更新できる (uid一致)', async () => {
        const testUser = testEnv.authenticatedContext('user0')
        const currentTimestamp = Timestamp.now()
        await assertSucceeds(
          testUser.firestore().collection(accountCollection).doc('user0').set(
            {
              displayName: 'Green',
              avatarUrl: 'https://some-cloud-storage.org/picture.png',
              updatedAt: currentTimestamp,
            },
            { merge: true }
          )
        )
      })
      test('ドキュメントを更新できない (uid不一致)', async () => {
        const testUser = testEnv.authenticatedContext('user0')
        const currentTimestamp = Timestamp.now()
        await assertFails(
          testUser.firestore().collection(accountCollection).doc('user1').set(
            {
              displayName: 'Green',
              updatedAt: currentTimestamp,
            },
            { merge: true }
          )
        )
      })
      test('ドキュメントを更新できない (型不一致)', async () => {
        const testUser = testEnv.authenticatedContext('user0')
        await assertFails(
          testUser.firestore().collection(accountCollection).doc('user0').set(
            {
              displayName: 90,
              avatarUrl: 3000,
              updatedAt: '2021-09-24',
            },
            { merge: true }
          )
        )
      })
      test('ドキュメントを更新できない (displayNameフィールドが許容文字数オーバー)', async () => {
        const testUser = testEnv.authenticatedContext('user0')
        const currentTimestamp = Timestamp.now()
        await assertFails(
          testUser.firestore().collection(accountCollection).doc('user0').set(
            {
              displayName: 'abcdefghijklmnopqrstuvwxyz',
              avatarUrl: 'https://some-cloud-storage.org/picture.png',
              updatedAt: currentTimestamp,
            },
            { merge: true }
          )
        )
      })
    })

    describe('DELETE', () => {
      test('ドキュメントを削除できない', async () => {
        const testUser = testEnv.authenticatedContext('testUser')
        await assertFails(testUser.firestore().collection(accountCollection).doc('testUser').delete())
      })
    })
  })
})

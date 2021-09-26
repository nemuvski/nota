import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { IoPersonCircleOutline, IoMailOutline, IoKeyOutline } from 'react-icons/io5'
import Layout from '@/components/Layout'
import Styles from '@/styles/settings-index-page.style'
import PageTitle from '@/styles/styled-components/page-title.component'
import Box from '@/styles/styled-components/box.component'
import Button from '@/styles/styled-components/button.component'
import EmailVerifyMessage from '@/components/EmailVerifyMessage'
import { useLoginState } from '@/hooks/auth'

const SettingsIndexPage: NextPage = () => {
  const router = useRouter()
  const { auth } = useLoginState()

  if (!auth) return null

  return (
    <Layout title='Settings'>
      <PageTitle>Settings</PageTitle>

      <Box>
        <EmailVerifyMessage />

        <ul css={Styles.menu}>
          <li>
            <Button color='gray' type='button' onClick={() => router.push('/settings/change-profile')}>
              <div css={Styles.icon}>
                <IoPersonCircleOutline />
              </div>
              <span>Change My Profile</span>
            </Button>
          </li>
          <li>
            <Button
              color={auth.emailVerified ? 'gray' : 'secondary'}
              type='button'
              onClick={() => auth.emailVerified && router.push('/settings/change-email')}
              disabled={!auth.emailVerified}
            >
              <div css={Styles.icon}>
                <IoMailOutline />
              </div>
              <span>Change Email</span>
            </Button>
          </li>
          <li>
            <Button
              color={auth.emailVerified ? 'gray' : 'secondary'}
              type='button'
              onClick={() => auth.emailVerified && router.push('/settings/change-password')}
              disabled={!auth.emailVerified}
            >
              <div css={Styles.icon}>
                <IoKeyOutline />
              </div>
              <span>Change Password</span>
            </Button>
          </li>
        </ul>
      </Box>
    </Layout>
  )
}

export default SettingsIndexPage

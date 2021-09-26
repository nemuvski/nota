import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { IoPersonCircleOutline, IoMailOutline, IoKeyOutline } from 'react-icons/io5'
import Layout from '@/components/Layout'
import Styles from '@/styles/settings-index-page.style'
import PageTitle from '@/styles/page-title.component'
import Box from '@/styles/box.component'
import Button from '@/styles/button.component'
import EmailVerifyMessage from '@/components/EmailVerifyMessage'

const SettingsIndexPage: NextPage = () => {
  const router = useRouter()

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
            <Button color='gray' type='button' onClick={() => router.push('/settings/change-email')}>
              <div css={Styles.icon}>
                <IoMailOutline />
              </div>
              <span>Change Email Address</span>
            </Button>
          </li>
          <li>
            <Button color='gray' type='button' onClick={() => router.push('/settings/change-password')}>
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

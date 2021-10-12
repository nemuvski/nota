import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { BsPencilSquare } from 'react-icons/bs'
import { IoSettingsOutline } from 'react-icons/io5'
import Layout from '@/components/Layout'
import Button from '@/styles/styled-components/button.component'
import ButtonList from '@/styles/styled-components/button-list.component'
import ButtonIcon from '@/styles/styled-components/button-icon.component'

const DashboardIndexPage: NextPage = () => {
  const router = useRouter()

  return (
    <Layout title='Dashboard'>
      <ButtonList alignment='right'>
        <Button type='button' color='primary' onClick={() => router.push('/own/articles/create')}>
          <ButtonIcon>
            <BsPencilSquare />
          </ButtonIcon>
          Create Article
        </Button>
        <Button type='button' color='gray' onClick={() => router.push('/settings')}>
          <ButtonIcon>
            <IoSettingsOutline />
          </ButtonIcon>
          Settings
        </Button>
      </ButtonList>
    </Layout>
  )
}

export default DashboardIndexPage

import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectMyAccount } from '@/stores/account/selector'
import { MAX_LENGTH_DISPLAY_NAME } from '@/constants/account'
import { MessageContent } from '@/models/Message'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/styled-components/page-title.component'
import Box from '@/styles/styled-components/box.component'
import Message from '@/components/Message'
import FormField from '@/styles/styled-components/form-field.component'
import { useForm } from 'react-hook-form'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'
import InputText from '@/styles/styled-components/input-text.component'

type FormFields = {
  displayName: string
}

const ChangePasswordPage: NextPage = () => {
  const router = useRouter()
  const myAccount = useSelector(selectMyAccount)
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      displayName: myAccount?.displayName,
    },
  })

  const submit = async (formFields: FormFields) => {
    const { displayName } = formFields

    setMessageContent(null)

    try {
      console.log('FIXME', displayName)
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <Layout title='Change Password'>
      <PageTitle>Change profile</PageTitle>

      <Box>
        {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

        <form onSubmit={handleSubmit(submit)}>
          <FormField>
            <label>Display name</label>
            <InputText
              isError={Boolean(errors.displayName)}
              type='text'
              placeholder={myAccount?.displayName}
              maxLength={MAX_LENGTH_DISPLAY_NAME}
              {...register('displayName', { required: true, maxLength: MAX_LENGTH_DISPLAY_NAME })}
            />
          </FormField>

          <FormActions>
            <Button type='button' color='gray' disabled={isSubmitting} onClick={() => router.push('./')}>
              Cancel
            </Button>
            <Button type='submit' color='primary' disabled={!isValid || isSubmitting}>
              Save
            </Button>
          </FormActions>
        </form>
      </Box>
    </Layout>
  )
}

export default ChangePasswordPage

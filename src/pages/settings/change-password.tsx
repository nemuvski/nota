import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectAuth } from '@/stores/auth/selector'
import { useToast } from '@/hooks/toast'
import { MessageContent } from '@/models/Message'
import { changePassword, reauthenticate } from '@/infrastructure/auth'
import Layout from '@/components/Layout'
import PageTitle from '@/styles/styled-components/page-title.component'
import Box from '@/styles/styled-components/box.component'
import EmailVerifyMessage from '@/components/EmailVerifyMessage'
import Message from '@/components/Message'
import Paragraph from '@/styles/styled-components/paragraph.component'
import FormField from '@/styles/styled-components/form-field.component'
import { Controller, useForm } from 'react-hook-form'
import { MIN_LENGTH_PASSWORD } from '@/constants/form'
import InputPassword from '@/components/InputPassword'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'

type FormFields = {
  currentPassword: string
  newPassword: string
}

const ChangePasswordPage: NextPage = () => {
  const router = useRouter()
  const auth = useSelector(selectAuth)
  const { addToast } = useToast()
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)
  const isEmailVerified = auth && auth.emailVerified

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  })

  /**
   * Submitボタン押下イベント
   *
   * @param formFields
   */
  const submit = async (formFields: FormFields) => {
    const { currentPassword, newPassword } = formFields

    setMessageContent(null)

    try {
      // パスワード変更前にパスワードチェック
      await reauthenticate(currentPassword)
      await changePassword(newPassword)
      addToast('success', 'Password changed')
      await router.push('./')
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <Layout title='Change Password'>
      <PageTitle>Change Password</PageTitle>

      <Box>
        {!isEmailVerified && (
          <Paragraph alignment='center'>
            If you want to change your password,
            <br />
            please complete your email address verification.
          </Paragraph>
        )}

        <EmailVerifyMessage />
        {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

        <form onSubmit={handleSubmit(submit)}>
          <FormField>
            <label>Current Password</label>
            <Controller
              control={control}
              name='currentPassword'
              rules={{ required: true, minLength: MIN_LENGTH_PASSWORD }}
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  isError={Boolean(errors.currentPassword)}
                  onChange={onChange}
                  value={value}
                  disabled={!isEmailVerified}
                />
              )}
            />
          </FormField>

          <FormField>
            <label>New Password</label>
            <Controller
              control={control}
              name='newPassword'
              rules={{ required: true, minLength: MIN_LENGTH_PASSWORD }}
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  isError={Boolean(errors.newPassword)}
                  onChange={onChange}
                  value={value}
                  disabled={!isEmailVerified}
                />
              )}
            />
          </FormField>

          <FormActions>
            <Button type='button' color='gray' disabled={isSubmitting} onClick={() => router.push('./')}>
              Cancel
            </Button>
            {isEmailVerified && (
              <Button type='submit' color='primary' disabled={!isValid || isSubmitting}>
                Submit
              </Button>
            )}
          </FormActions>
        </form>
      </Box>
    </Layout>
  )
}

export default ChangePasswordPage

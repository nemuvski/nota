import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { MIN_LENGTH_PASSWORD } from '@/constants/form'
import { selectAuth } from '@/stores/auth/selector'
import Layout from '@/components/Layout'
import InputPassword from '@/components/InputPassword'
import PageTitle from '@/styles/styled-components/page-title.component'
import Box from '@/styles/styled-components/box.component'
import FormField from '@/styles/styled-components/form-field.component'
import InputText from '@/styles/styled-components/input-text.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'
import React, { useState } from 'react'
import Message from '@/components/Message'
import { changeEmailAddress } from '@/infrastructure/auth'

type FormFields = {
  newEmail: string
  password: string
}

const ChangeEmailPage: NextPage = () => {
  const router = useRouter()
  const auth = useSelector(selectAuth)
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)
  const currentEmail = auth && auth.email ? auth.email : ''

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      newEmail: '',
      password: '',
    },
  })

  if (!currentEmail) return null

  /**
   * Submitボタン押下イベント
   *
   * @param formFields
   */
  const submit = async (formFields: FormFields) => {
    const { newEmail, password } = formFields

    setMessageContent(null)

    if (currentEmail === newEmail) {
      setMessageContent({ level: 'error', content: 'Please enter a different email address' })
      return
    }

    try {
      await changeEmailAddress(newEmail, password)
      setMessageContent({ level: 'success', content: 'Email address changed' })
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <Layout title='Change Email'>
      <PageTitle>Change Email</PageTitle>

      <Box>
        {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

        <form onSubmit={handleSubmit(submit)}>
          <FormField>
            <label>Current Email address</label>
            <InputText type='text' readOnly disabled value={currentEmail} />
          </FormField>

          <FormField>
            <label>New Email address</label>
            <InputText isError={Boolean(errors.newEmail)} type='email' {...register('newEmail', { required: true })} />
          </FormField>

          <FormField>
            <label>Password</label>
            <Controller
              control={control}
              name='password'
              rules={{ required: true, minLength: MIN_LENGTH_PASSWORD }}
              render={({ field: { onChange, value } }) => (
                <InputPassword isError={Boolean(errors.password)} onChange={onChange} value={value} />
              )}
            />
          </FormField>

          <FormActions>
            <Button type='button' color='gray' disabled={isSubmitting} onClick={() => router.push('./')}>
              Cancel
            </Button>
            <Button type='submit' color='primary' disabled={!isValid || isSubmitting}>
              Submit
            </Button>
          </FormActions>
        </form>
      </Box>
    </Layout>
  )
}

export default ChangeEmailPage

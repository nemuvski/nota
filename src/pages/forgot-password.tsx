import type { NextPage } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { sendPasswordResetInstructions } from '@/infrastructure/auth'
import { MessageContent } from '@/models/Message'
import Layout from '@/components/Layout'
import Message from '@/components/Message'
import Paragraph from '@/styles/styled-components/paragraph.component'
import PageTitle from '@/styles/styled-components/page-title.component'
import InputText from '@/styles/styled-components/input-text.component'
import Button from '@/styles/styled-components/button.component'
import Box from '@/styles/styled-components/box.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import FormField from '@/styles/styled-components/form-field.component'

type FormFields = {
  email: string
}

const ForgotPasswordPage: NextPage = () => {
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  /**
   * ボタン押下イベント
   *
   * @param formFields
   */
  const submit = async (formFields: FormFields) => {
    const { email } = formFields
    try {
      setMessageContent(null)
      await sendPasswordResetInstructions(email)
      setMessageContent({ level: 'success', content: `Your password reset instructions have been sent to ${email}` })
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <Layout title='Forgot Password'>
      <PageTitle>Reset your password</PageTitle>

      <Box>
        <Paragraph alignment='center'>
          Enter your email address below and
          <br />
          {"we'll send your password reset instructions."}
        </Paragraph>

        {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

        <form onSubmit={handleSubmit(submit)}>
          <FormField>
            <label>Email address</label>
            <InputText isError={Boolean(errors.email)} type='email' {...register('email', { required: true })} />
          </FormField>

          <FormActions>
            <Button type='submit' color='primary' disabled={!isValid || isSubmitting}>
              Send
            </Button>
          </FormActions>
        </form>

        <Paragraph alignment='center'>
          <Link href='/login'>
            <a>Go back to the login page</a>
          </Link>
        </Paragraph>
      </Box>
    </Layout>
  )
}

export default ForgotPasswordPage

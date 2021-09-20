import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Layout from '@/components/Layout'
import Styles from '@/styles/forgot-password-page.style'
import Paragraph from '@/styles/paragraph.component'
import PageTitle from '@/styles/page-title.component'
import InputText from '@/styles/input-text.component'
import Button from '@/styles/button.component'
import Box from '@/styles/box.component'

type FormFields = {
  email: string
}

const ForgotPasswordPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
  const submit = (formFields: FormFields) => {
    console.log(formFields)
  }

  return (
    <Layout title='Forgot Password'>
      <PageTitle>Reset your password</PageTitle>

      <Box>
        <Paragraph alignment='center'>
          Enter your email address below and
          <br />
          {"we'll send your password reset instructions"}
        </Paragraph>

        <form onSubmit={handleSubmit(submit)}>
          <div>
            <label>Email address</label>
            <InputText isError={Boolean(errors.email)} type='email' {...register('email', { required: true })} />
          </div>

          <div css={Styles.actions}>
            <Button type='submit' color='primary' disabled={Boolean(errors.email) || isSubmitting}>
              Send
            </Button>
          </div>
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

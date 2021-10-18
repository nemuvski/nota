import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { RawDraftContentState } from 'draft-js'
import { useDispatch, useSelector } from 'react-redux'
import { INITIAL_BODY_CONTENT, MAX_LENGTH_TITLE } from '@/constants/article'
import { Article, ArticleStatus } from '@/models/Article'
import { MessageContent } from '@/models/Message'
import { useToast } from '@/hooks/toast'
import { selectMyAccount } from '@/stores/account/selector'
import { AppDispatch } from '@/stores/store'
import { uploadThumbnailImage } from '@/infrastructure/storage/article'
import { addArticleAction, updateArticleAction } from '@/stores/article/action'
import Message from '@/components/Message'
import RichTextEditor from '@/components/RichTextEditor'
import SetThumbnail from '@/components/SetThumbnail'
import FormField from '@/styles/styled-components/form-field.component'
import Button from '@/styles/styled-components/button.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import InputText from '@/styles/styled-components/input-text.component'

type Props = {
  article?: Article
}

type FormFields = {
  title: string
  body: RawDraftContentState
}

const ArticleForm: React.FC<Props> = ({ article }) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { addToast } = useToast()
  const myAccount = useSelector(selectMyAccount)
  const [messageContent, setMessageContent] = useState<MessageContent | null>(null)
  const [uploadingImage, setUploadingImage] = useState<Blob | undefined>(undefined)

  const initialBodyContent = useMemo(() => (article ? article.body : INITIAL_BODY_CONTENT), [article])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormFields>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      title: article ? article.title : '',
      body: initialBodyContent,
    },
  })

  /**
   * Saveボタン押下イベント
   *
   * @param formFields
   * @param isDraft
   */
  const submit = async (formFields: FormFields, isDraft: boolean) => {
    if (!myAccount) return
    const { title, body } = formFields
    setMessageContent(null)

    try {
      let uploadedAvatarImageUrl: string | undefined
      // ファイル選択がされている場合のみアップロード
      if (uploadingImage) {
        uploadedAvatarImageUrl = await uploadThumbnailImage(myAccount.uid, uploadingImage)
        addToast('success', 'Avatar image uploaded')
        // アップロード後はローカルデータはクリア
        setUploadingImage(undefined)
      }

      let addedArticle: Article | undefined

      // コンポーネントプロパティのarticleがある場合は編集モード
      if (article) {
        addedArticle = await dispatch(
          updateArticleAction({
            id: article.id,
            ownerUid: myAccount.uid,
            title,
            body,
            thumbnailUrl: uploadedAvatarImageUrl,
            status: isDraft ? ArticleStatus.Draft : ArticleStatus.Published,
          })
        ).unwrap()
        addToast('success', 'Article changed')
      } else {
        addedArticle = await dispatch(
          addArticleAction({
            ownerUid: myAccount.uid,
            title,
            body,
            thumbnailUrl: uploadedAvatarImageUrl,
            status: isDraft ? ArticleStatus.Draft : ArticleStatus.Published,
          })
        ).unwrap()
        addToast('success', 'Article created')
      }

      // 作成/更新できたあとは詳細ページへ飛ぶ
      if (addedArticle) {
        router.replace({
          pathname: '/own/articles/[docId]',
          query: { docId: addedArticle.id },
        })
      }
    } catch (error: any) {
      setMessageContent({ level: 'error', content: error.message })
    }
  }

  return (
    <>
      {messageContent && <Message level={messageContent.level}>{messageContent.content}</Message>}

      <form onSubmit={(e) => e.preventDefault()}>
        <FormField>
          <label>Thumbnail Image</label>
          <SetThumbnail
            thumbnailUrl={article?.thumbnailUrl}
            uploadingImageData={uploadingImage}
            setUploadingImageData={(data) => setUploadingImage(data)}
          />
        </FormField>

        <FormField>
          <label>Title</label>
          <InputText
            isError={Boolean(errors.title)}
            type='text'
            maxLength={MAX_LENGTH_TITLE}
            {...register('title', { required: true, maxLength: MAX_LENGTH_TITLE })}
          />
        </FormField>

        <FormField>
          <label>Body</label>
          <Controller
            control={control}
            name='body'
            render={({ field: { onChange } }) => (
              <RichTextEditor initialContent={initialBodyContent} onChange={onChange} />
            )}
          />
        </FormField>

        <FormActions>
          <Button
            type='button'
            color='gray'
            disabled={isSubmitting}
            onClick={() => {
              router.replace(
                article ? { pathname: '/own/articles/[docId]', query: { docId: article.id } } : '/dashboard'
              )
            }}
          >
            Cancel
          </Button>
          <Button
            type='button'
            color='gray'
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit((formFields) => submit(formFields, true))}
          >
            Save as Draft
          </Button>
          <Button
            type='button'
            color='primary'
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit((formFields) => submit(formFields, false))}
          >
            Save & Publish
          </Button>
        </FormActions>
      </form>
    </>
  )
}

export default ArticleForm

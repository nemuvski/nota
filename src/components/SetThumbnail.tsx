import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Area } from 'react-easy-crop/types'
import { IoImageOutline } from 'react-icons/io5'
import { getCroppedImage } from '@/utils/file'
import { THUMBNAIL_ASPECT_RATIO } from '@/constants/article'
import Modal from '@/components/Modal'
import FileDropzone from '@/components/FileDropzone'
import ImageCropper from '@/components/ImageCropper'
import Styles from '@/styles/set-thumbnail.style'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'
import ButtonIcon from '@/styles/styled-components/button-icon.component'

type Props = {
  thumbnailUrl?: string
  uploadingImageData?: Blob
  setUploadingImageData: (data?: Blob) => void
}

const SetThumbnail: React.FC<Props> = ({ thumbnailUrl, uploadingImageData, setUploadingImageData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  // 選択中の画像ファイル
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  // 切り出す領域
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  /**
   * uploadingImageDataが更新され、内容が空の場合は選択中の画像ファイルをクリア
   */
  useEffect(() => {
    if (!uploadingImageData) {
      setSelectedFile(undefined)
    }
  }, [uploadingImageData])

  /**
   * 画像を切り出す
   */
  const cropImage = useCallback(async () => {
    if (selectedFile && croppedAreaPixels) {
      const cropImage = await getCroppedImage(selectedFile, croppedAreaPixels)
      setUploadingImageData(cropImage)
    }
  }, [selectedFile, croppedAreaPixels, setUploadingImageData])

  const modalComponent = useMemo(
    () => (
      <Modal closeAction={() => setIsOpenModal(false)}>
        {/* ファイル未選択の場合のみ、ファイル選択が可能 */}
        {!selectedFile && <FileDropzone dropAction={(file) => setSelectedFile(file)} />}

        {selectedFile && (
          <>
            <ImageCropper
              imageSource={selectedFile}
              setCroppedAreaPixels={(area) => setCroppedAreaPixels(area)}
              aspect={THUMBNAIL_ASPECT_RATIO}
              isCropRoundShape={false}
            />
            <FormActions>
              <Button
                type='button'
                color='gray'
                onClick={() => {
                  setSelectedFile(undefined)
                  setUploadingImageData(undefined)
                }}
              >
                Clear
              </Button>
              <Button
                type='button'
                color='primary'
                onClick={async () => {
                  await cropImage()
                  setIsOpenModal(false)
                }}
              >
                OK
              </Button>
            </FormActions>
          </>
        )}
      </Modal>
    ),
    [selectedFile, cropImage, setUploadingImageData]
  )

  const imageUrl = useMemo(() => {
    if (uploadingImageData) {
      return URL.createObjectURL(uploadingImageData)
    }
    return thumbnailUrl
  }, [thumbnailUrl, uploadingImageData])

  return (
    <>
      <div css={Styles.root}>
        {(thumbnailUrl || uploadingImageData) && (
          <div css={Styles.imageWrapper}>
            <img src={imageUrl} alt='Thumbnail Image' />
          </div>
        )}
        <div css={[Styles.actions, (thumbnailUrl || uploadingImageData) && Styles.actionsVariant]}>
          {uploadingImageData && (
            <Button type='button' color='gray' onClick={() => setUploadingImageData(undefined)}>
              Clear
            </Button>
          )}
          <Button type='button' color='primary' onClick={() => setIsOpenModal(true)}>
            <ButtonIcon>
              <IoImageOutline />
            </ButtonIcon>
            {uploadingImageData ? 'Edit' : 'Select a image file'}
          </Button>
        </div>
      </div>

      {/* ファイルの選択/トリミングをするモーダル */}
      {isOpenModal && modalComponent}
    </>
  )
}

export default SetThumbnail

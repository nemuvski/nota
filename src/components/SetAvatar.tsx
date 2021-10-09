import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Area } from 'react-easy-crop/types'
import { IoCameraReverse } from 'react-icons/io5'
import Modal from '@/components/Modal'
import FileDropzone from '@/components/FileDropzone'
import ImageCropper from '@/components/ImageCropper'
import Styles from '@/styles/set-avatar.style'
import Avatar from '@/styles/styled-components/avatar.component'
import FormActions from '@/styles/styled-components/form-actions.component'
import Button from '@/styles/styled-components/button.component'
import { getCroppedImage } from '@/utils/file'

type Props = {
  avatarUrl?: string
  uploadingImageData?: Blob
  setUploadingImageData: (data?: Blob) => void
}

const SetAvatar: React.FC<Props> = ({ avatarUrl, uploadingImageData, setUploadingImageData }) => {
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

  const avatarPreviewComponent = useMemo(
    () => (
      <div css={Styles.root}>
        <Avatar
          css={Styles.image}
          // 選択中のファイル優先して表示
          src={uploadingImageData ? URL.createObjectURL(uploadingImageData) : avatarUrl}
          onClick={() => setIsOpenModal(true)}
        />
        <div css={Styles.editIconWrapper}>
          <IoCameraReverse css={Styles.editIcon} onClick={() => setIsOpenModal(true)} />
        </div>
      </div>
    ),
    [uploadingImageData, avatarUrl]
  )

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
              isCropRoundShape={true}
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

  return (
    <>
      {avatarPreviewComponent}
      {/* ファイルの選択/トリミングをするモーダル */}
      {isOpenModal && modalComponent}
    </>
  )
}

export default SetAvatar

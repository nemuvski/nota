import React, { useCallback, useMemo, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Area, Point } from 'react-easy-crop/types'
import Styles from '@/styles/image-cropper.style'

type Props = {
  imageSource: File
  setCroppedAreaPixels: (area: Area) => void
  aspect?: number
  isCropRoundShape?: boolean
  containerHeight?: number
}

const ImageCropper: React.FC<Props> = ({
  imageSource,
  setCroppedAreaPixels,
  aspect = 1,
  isCropRoundShape = false,
  containerHeight = 300,
}) => {
  const [crop, onCropChange] = useState<Point>({ x: 0, y: 0 })
  const [zoom, onZoomChange] = useState(1)

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [setCroppedAreaPixels]
  )

  const rootStyles = useMemo(() => [Styles.root, Styles.setContainerHeight(containerHeight)], [containerHeight])

  return (
    <div css={rootStyles}>
      <Cropper
        image={URL.createObjectURL(imageSource)}
        crop={crop}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        zoom={zoom}
        onZoomChange={onZoomChange}
        aspect={aspect}
        cropShape={isCropRoundShape ? 'round' : 'rect'}
        objectFit='contain'
        restrictPosition
        showGrid
      />
    </div>
  )
}

export default ImageCropper

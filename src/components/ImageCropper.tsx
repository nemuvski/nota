import React, { useCallback, useMemo, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Point } from 'react-easy-crop/types'
import Styles from '@/styles/image-cropper.style'

type Props = {
  imageSource: string
  aspect: number
  isCropRoundShape?: boolean
  containerHeight?: number
}

const ImageCropper: React.FC<Props> = ({ imageSource, aspect, isCropRoundShape = false, containerHeight = 300 }) => {
  const [crop, onCropChange] = useState<Point>({ x: 0, y: 0 })
  const [zoom, onZoomChange] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

  const rootStyles = useMemo(() => [Styles.root, Styles.setContainerHeight(containerHeight)], [containerHeight])

  return (
    <div css={rootStyles}>
      <Cropper
        image={imageSource}
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

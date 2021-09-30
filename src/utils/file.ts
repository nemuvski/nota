import { Area } from 'react-easy-crop/types'

/**
 * 画像ファイルを読み込みHTMLImageElementを返却する
 *
 * @param imageFile
 */
const createImage = (imageFile: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = URL.createObjectURL(imageFile)
  })

/**
 * 切り出した画像データを返却する
 *
 * @param imageFile
 * @param croppedAreaPixels
 */
export const getCroppedImage = async (imageFile: File, croppedAreaPixels: Area) => {
  const image = await createImage(imageFile)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Failed to crop the image')
  }

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.translate(-safeArea / 2, -safeArea / 2)
  ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5)
  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = croppedAreaPixels.width
  canvas.height = croppedAreaPixels.height

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - croppedAreaPixels.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - croppedAreaPixels.y)
  )

  return new Promise<Blob | undefined>((resolve) => {
    canvas.toBlob(
      (blob) => {
        resolve(blob ?? undefined)
      },
      'image/jpeg',
      0.9
    )
  })
}

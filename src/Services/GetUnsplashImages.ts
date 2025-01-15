import { UnsplashImageType } from './UnsplahImageType'
import { fetchListImages, fetchSearchImages } from './UnsplashApi'

async function getUnsplashImages(query: string = '', page: number, perPage: number = 9): Promise<UnsplashImageType[] | undefined> {
    try {
        let images: UnsplashImageType[] | undefined
        if (!query) {
            await fetchListImages(page).then(result => { images = result })
        } else {
            await fetchSearchImages(query, page, perPage).then(result => { images = result })
        }

        if (!images) return

        const imagesWithBase64 = await Promise.all(images.map(async (image) => {
            const base64Small = await convertUrlToBase64(image.urls.small)
            image.urls.small = base64Small
            return image

        }))

        return imagesWithBase64
    } catch (error) {
        console.error('Error fetching Unsplash images:', error)
    }
}

function convertUrlToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = 'Anonymous'
        image.src = url

        image.onload = () => {
            const canvas = document.createElement('canvas')
            const canvasContext = canvas.getContext('2d')

            if (!canvasContext) {
                reject(new Error('Canvas context не поддерживается'))
                return
            }
            canvas.width = image.width
            canvas.height = image.height

            canvasContext.drawImage(image, 0, 0)

            const base64Image = canvas.toDataURL('image/png')
            resolve(base64Image)
        }

        image.onerror = (error) => {
            reject(error)
        }
    })
}

export {
    getUnsplashImages
}
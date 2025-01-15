import { PopOverImageType } from '../components/ImagesPopOver/ImagesPopOver'
import { UnsplashImageType } from '../Services/UnsplahImageType'
import { useAppActions } from '../Store/Hooks/useAppActions'
import { Size } from './LocationTypes/Size'

function useCreatePopOverImagesFromUnsplash(unsplashImages: UnsplashImageType[] | undefined): PopOverImageType[] {
    const { createImageBlock } = useAppActions()

    if (!unsplashImages) {
        return []
    }

    const popOverImages: PopOverImageType[] = []
    unsplashImages.forEach(image => {
        const imageSize = getImageSize(image.urls.small)
        
        popOverImages.push({
            url: image.urls.small,
            action: () => createImageBlock({
                x: 0,
                y: 0,
                width: imageSize.width,
                height: imageSize.height,
                path: image.urls.small
            })
        })
    })

    return popOverImages
}

function getImageSize(url: string): Size {
    const size: Size = {
        width: 0,
        height: 0
    }
    const img = new Image()
    img.onload = function () {
        size.width = img.width
        size.height = img.height
    }
    img.onerror = function () {
        console.log('Ошибка загрузки изображения')
    }
    img.src = url

    return size
}

export {
    useCreatePopOverImagesFromUnsplash
}
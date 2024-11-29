import { createImageBlock } from '../../Store/Functions/modificationFunctions'
import { dispatch } from '../../Store/Editor'
import { convertImageToBase64, getImageDimensions } from '../ImageUtils'

const getImageSetter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        try {
            const { width, height } = await getImageDimensions(file)
            const base64String = await convertImageToBase64(file)
            
            dispatch(createImageBlock, { 
                x: 100,
                y: 100,
                width,
                height,
                path: base64String 
            })
            
            target.value = ''
        } catch (error) {
            console.log('Ошибка при обработке изображения:', error)
        }
    }
}

export default getImageSetter
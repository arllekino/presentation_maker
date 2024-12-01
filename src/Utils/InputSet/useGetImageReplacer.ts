import { useAppActions } from '../../Store/Hooks/useAppActions'
import { convertImageToBase64 } from '../ImageUtils'

function useGetImageReplacer(slideObjectId: string) {
    const {replaceImage} = useAppActions()

    return async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]

        if (file) {
            try {
                const base64String = await convertImageToBase64(file)

                replaceImage(slideObjectId, base64String)

                target.value = ''
            } catch (error) {
                console.log('Ошибка при обработке изображения:', error)
            }
        }
    }
}

export default useGetImageReplacer
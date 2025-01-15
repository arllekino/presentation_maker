import { useAppActions } from '../../Store/Hooks/useAppActions'
import { convertImageToBase64 } from '../ImageUtils'

function useGetImageBackgroundSetter(id: string | null): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const { setBackgroundImageSlide, makeImageBlockAsBackground } = useAppActions()
   
    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (file) {
            convertImageToBase64(file).then(base64String => {
                setBackgroundImageSlide(id, base64String)
                makeImageBlockAsBackground('')
            })
        }

        target.value = ''
    }

    return setImage
}

export default useGetImageBackgroundSetter
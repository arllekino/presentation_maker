import { dispatch } from "../../Store/Editor"
import { convertImageToBase64 } from "../ImageUtils"
import { useAppActions } from "../../Store/Hooks/useAppActions"

function useGetImageBackgroundSetter(id: string | null): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const { setBackgroundImageSlide } = useAppActions()
   
    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const file = target.files?.[0]
        if (file) {
            convertImageToBase64(file).then(base64String => {
                dispatch(setBackgroundImageSlide, { slideId: id, path: base64String })
            })
        }

        target.value = ''
    }

    return setImage
}

export default useGetImageBackgroundSetter
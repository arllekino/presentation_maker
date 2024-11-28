import { setBackgroundImageSlide } from "../../Functions/modificationFunctions"
import { dispatch } from "../../Store/Editor"
import { convertImageToBase64 } from "../ImageUtils"

function getImageBackgroundSetter(id: string | null): (event: React.ChangeEvent<HTMLInputElement>) => void {
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

export default getImageBackgroundSetter
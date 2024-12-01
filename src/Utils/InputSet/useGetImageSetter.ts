import { CreateImageBlockPayload } from "../../Store/Redux/PayloadTypes"
import { convertImageToBase64, getImageDimensions } from "../ImageUtils"

const handleImageUploadEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
    createImageBlock: (payload: CreateImageBlockPayload) => void
) => {
    const handleImageUpload = async (file: File) => {
        try {
            const { width, height } = await getImageDimensions(file)
            const base64String = await convertImageToBase64(file)

            createImageBlock({
                x: 100,
                y: 100,
                width,
                height,
                path: base64String,
            })
        } catch (error) {
            console.log("Ошибка при обработке изображения:", error)
        }
    }

    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
        handleImageUpload(file)
        target.value = ""
    }
}

export default handleImageUploadEvent

import { setBackgroundColorSlide } from "../../Store/Functions/modificationFunctions"
import { dispatch } from "../../Store/Editor"

function useGetColorBackgroundSetter(id: string | null): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const setColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setBackgroundColorSlide, {
            slideId: id,
            hexColor: e.target.value
        })
    }

    return setColor
}

export default useGetColorBackgroundSetter
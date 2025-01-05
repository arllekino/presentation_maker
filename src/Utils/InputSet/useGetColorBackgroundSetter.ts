import { useAppActions } from '../../Store/Hooks/useAppActions'

function useGetColorBackgroundSetter(id: string | null): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const {setBackgroundColorSlide} = useAppActions()

    const setColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColorSlide(id, e.target.value)
    }

    return setColor
}

export default useGetColorBackgroundSetter
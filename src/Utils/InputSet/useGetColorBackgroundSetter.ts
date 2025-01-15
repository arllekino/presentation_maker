import { useAppActions } from '../../Store/Hooks/useAppActions'

function useGetColorBackgroundSetter(id: string | null): (event: React.ChangeEvent<HTMLInputElement>) => void {
    const { setBackgroundColorSlide, makeImageBlockAsBackground } = useAppActions()

    const setColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColorSlide(id, e.target.value)
        makeImageBlockAsBackground('')
    }

    return setColor
}

export default useGetColorBackgroundSetter
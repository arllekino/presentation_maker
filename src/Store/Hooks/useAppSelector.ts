import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { editorReducer } from '../Redux/EditorReducer'

type RootState = ReturnType<typeof editorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector
}
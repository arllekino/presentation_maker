import { PresentationType } from './PresentationType'

type EditorType = {
    presentation: PresentationType
    selectedSlideId: string | null
    selectedBlockIds: string[]
}

export type { EditorType }
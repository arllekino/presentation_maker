import { PresentationType } from './PresentationType'

type EditorType = {
    presentation: PresentationType
    selectedSlideIds: string[]
    selectedBlockIds: string[]
}

export type { EditorType }
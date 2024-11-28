import { SlideType } from './SlideType'

type PresentationType = {
    title: string
    orderedSlideIds: string[]
    listSlides: Map<string, SlideType>
}

export type {
    PresentationType
}
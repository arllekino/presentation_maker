import { ImageSlideObject, TextSlideObject } from './SlideObjectTypes'

type BackgroundImage = {
    path: string
    type: 'image'
}

type BackgroundColor = {
    hexColor: string
    type: 'color'
}

type SlideType = {
    id: string
    blocks: Array<TextSlideObject | ImageSlideObject>
    background: BackgroundColor | BackgroundImage
}

export type {
    SlideType
}
import { ImageSlideObject, TextSlideObject } from './SlideObjectTypes'

type BackgroundImage = {
    type: 'image'
    path: string
}

type BackgroundColor = {
    type: 'color'
    hexColor: string
}

type BackgroundGradient = {
    type: 'gradient'
    points: GradientPoint[]
    angle: number
}

type GradientPoint = {
    color: string
    range: number
}

type SlideType = {
    id: string
    blocks: Array<TextSlideObject | ImageSlideObject>
    background: BackgroundColor | BackgroundImage | BackgroundGradient
    backgroundAsImageBlockId?: string
}

export type {
    SlideType,
    GradientPoint
}
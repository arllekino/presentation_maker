type SlideObject = {
    id: string
    coordinates: Coordinates
    size: Size
    opacity: number
    overlayPriority: number
    border: Border | null
    isFixed: boolean
    rotation: number
}

type ImageSlideObject = SlideObject & {
    imagePath: string
    type: 'image_block'
}

type TextSlideObject = SlideObject & {
    content: string
    backgroundColor: string
    font: Font
    type: 'text_block'
}

type Coordinates = {
    x: number
    y: number
}

type Size = {
    width: number
    height: number
}

type Border = {
    hexColor: string
    width: number
}

type Font = {
    family: string,
    size: number,
    hexColor: string,
    weight: number
}

export type {
    SlideObject,
    ImageSlideObject,
    TextSlideObject,
}
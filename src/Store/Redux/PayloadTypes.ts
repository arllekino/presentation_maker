type CreateTextBlockPayload = {
    x: number,
    y: number,
    width: number,
    height: number,
    content: string
}

type CreateImageBlockPayload = {
    x: number
    y: number
    width: number
    height: number
    path: string
}

export type {
    CreateTextBlockPayload,
    CreateImageBlockPayload
}
import ImageSlideObject from './SlideObjects/ImageSlideObject'
import TextSlideObject from './SlideObjects/TextSlideObject'

const ListSlides = {
    type: "object",
    additionalProperties: {
        type: "object",
        properties: {
            id: { type: "string" },
            blocks: {
                type: "array",
                items: {
                    oneOf: [
                        ImageSlideObject,
                        TextSlideObject
                    ]
                }
            },
            background: {
                oneOf: [
                    {
                        type: "object",
                        properties: {
                            path: { type: "string" },
                            type: { enum: ["image"] }
                        },
                        required: ["path", "type"]
                    },
                    {
                        type: "object",
                        properties: {
                            hexColor: { type: "string" },
                            type: { enum: ["color"] }
                        },
                        required: ["hexColor", "type"]
                    }
                ]
            }
        },
        required: ["id", "blocks", "background"]
    }
}

export default ListSlides
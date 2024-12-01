import ListSlides from './ListSlides'

const schema = {
    type: "object",
    properties: {
        presentation: {
            type: "object",
            properties: {
                title: { type: "string" },
                orderedSlideIds: {
                    type: "array",
                    items: { type: "string" }
                },
                listSlides: ListSlides
            },
            required: ["title", "orderedSlideIds", "listSlides"]
        },
        selectedSlideId: {
            oneOf: [
                { type: "string" },
                { type: "null" }
            ]
        },
        selectedBlockIds: {
            type: "array",
            items: { type: "string" }
        }
    },
    required: ["presentation", "selectedSlideId", "selectedBlockIds"],
    additionalProperties: false
}

export default schema
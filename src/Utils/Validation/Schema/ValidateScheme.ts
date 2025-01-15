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
        selectedSlideIds: {
            type: "array",
            items: { type: "string" }
        },
        selectedBlockIds: {
            type: "array",
            items: { type: "string" }
        }
    },
    required: ["presentation", "selectedSlideIds", "selectedBlockIds"],
    additionalProperties: false
}

export default schema
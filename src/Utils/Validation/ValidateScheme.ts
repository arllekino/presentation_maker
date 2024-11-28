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
                listSlides: {
                    type: "object",
                    additionalProperties: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            blocks: {
                                type: "array",
                                items: {
                                    oneOf: [
                                        {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                coordinates: {
                                                    type: "object",
                                                    properties: {
                                                        x: { type: "number" },
                                                        y: { type: "number" }
                                                    },
                                                    required: ["x", "y"]
                                                },
                                                size: {
                                                    type: "object",
                                                    properties: {
                                                        width: { type: "number" },
                                                        height: { type: "number" }
                                                    },
                                                    required: ["width", "height"]
                                                },
                                                opacity: { type: "number" },
                                                overlayPriority: { type: "number" },
                                                border: {
                                                    type: "object",
                                                    properties: {
                                                        hexColor: { type: "string" },
                                                        width: { type: "number" }
                                                    },
                                                    required: ["hexColor", "width"]
                                                },
                                                isFixed: { type: "boolean" }
                                            },
                                            required: [
                                                "id",
                                                "coordinates",
                                                "size",
                                                "opacity",
                                                "overlayPriority",
                                                "isFixed"
                                            ]
                                        },
                                        {
                                            type: "object",
                                            properties: {
                                                id: { type: "string" },
                                                coordinates: {
                                                    type: "object",
                                                    properties: {
                                                        x: { type: "number" },
                                                        y: { type: "number" }
                                                    },
                                                    required: ["x", "y"]
                                                },
                                                size: {
                                                    type: "object",
                                                    properties: {
                                                        width: { type: "number" },
                                                        height: { type: "number" }
                                                    },
                                                    required: ["width", "height"]
                                                },
                                                opacity: { type: "number" },
                                                overlayPriority: { type: "number" },
                                                isFixed: { type: "boolean" },
                                                content: { type: "string" },
                                                backgroundColor: { type: "string" },
                                                font: {
                                                    type: "object",
                                                    properties: {
                                                        family: { type: "string" },
                                                        size: { type: "number" },
                                                        hexColor: { type: "string" }
                                                    },
                                                    required: ["family", "size", "hexColor"]
                                                }
                                            },
                                            required: [
                                                "id",
                                                "coordinates",
                                                "size",
                                                "opacity",
                                                "overlayPriority",
                                                "isFixed",
                                                "content",
                                                "backgroundColor",
                                                "font"
                                            ]
                                        }
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
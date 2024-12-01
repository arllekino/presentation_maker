const TextSlideObject = {
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
}

export default TextSlideObject
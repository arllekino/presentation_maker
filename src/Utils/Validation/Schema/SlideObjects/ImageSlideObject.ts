const ImageSlideObject = {
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

export default ImageSlideObject
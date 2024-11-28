type ImageDimensions = {
    width: number
    height: number
}

function convertImageToBase64(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result?.toString() ?? '')
        }

        reader.onerror = () => {
            reject('Failed to load image')
        }
    })
}

function getImageDimensions(file: Blob): Promise<ImageDimensions> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve({ width: img.width, height: img.height })
        }
        img.onerror = reject
        img.src = URL.createObjectURL(file)
    })
}

export {
    convertImageToBase64,
    getImageDimensions
}
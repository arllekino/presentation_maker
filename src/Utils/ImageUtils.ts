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

function convertImageUrlToBase64(url: string): Promise<string> {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не в порядке')
            }
            return response.blob()
        })
        .then(blob => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    resolve(reader.result as string)
                }
                reader.onerror = () => {
                    reject('Ошибка при чтении файла')
                }
                reader.readAsDataURL(blob)
            })
        })
}

export {
    convertImageUrlToBase64,
    convertImageToBase64,
    getImageDimensions
}
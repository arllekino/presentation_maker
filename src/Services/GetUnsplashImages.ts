import { UnsplashImageType } from './UnsplahImageType'
import { fetchListImages, fetchSearchImages } from './UnsplashApi'

async function getUnsplashImages(query: string = '', page: number, perPage: number = 9) {
    try {
        console.log(page);
        
        let images: UnsplashImageType[] | undefined
        if (!query) {
            await fetchListImages(page).then(result => { images = result })
        } else {
            await fetchSearchImages(query, page, perPage).then(result => { images = result })
        }

        return images
    } catch (error) {
        console.error('Error fetching Unsplash images:', error)
    }
}

export {
    getUnsplashImages
}
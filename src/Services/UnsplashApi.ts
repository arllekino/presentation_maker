import { UnsplashImageType } from "./UnsplahImageType"

const UNSPLASH_ACCES_KEY = '6ZxkWK3KVCh1jtGKpi4rcbiVmmLFqUqkhY1od1Bi2Yg'

async function fetchListImages(page: number): Promise<UnsplashImageType[] | undefined> {
    const url = `https://api.unsplash.com/photos?page=${page}&client_id=${UNSPLASH_ACCES_KEY}`
    
    try {
        const response = await fetch(url)

        if (!response.ok) {
            return
        }

        const data = await response.json()

        return data as UnsplashImageType[]
    } catch (error) {
        console.log(error)
    }
}

async function fetchSearchImages(query: string, page: number = 1, perPage: number = 9): Promise<UnsplashImageType[] | undefined> {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&client_id=${UNSPLASH_ACCES_KEY}`
    
    try {
        const response = await fetch(url)

        if (!response.ok) {
            return
        }

        const data = await response.json()

        return data['results'] as UnsplashImageType[]
    } catch (error) {
        console.log(error)
        
    }
}

export {
    fetchListImages,
    fetchSearchImages
}
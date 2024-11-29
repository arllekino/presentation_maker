import {  replaceImage } from '../../Store/Functions/modificationFunctions'
import { dispatch } from '../../Store/Editor'
import { convertImageToBase64 } from '../ImageUtils'

function getImageReplacer(slideObjectId: string) {
    return async (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
            try {
                const base64String = await convertImageToBase64(file);

                dispatch(replaceImage, { 
                    id: slideObjectId,
                    newPath: base64String
                });

                target.value = '';
            } catch (error) {
                console.log('Ошибка при обработке изображения:', error);
            }
        }
    };
}

export default getImageReplacer
import { v4 as uuid } from 'uuid'
import { PresentationType } from '../../Types/PresentationType'
import { SlideType } from '../../Types/SlideType'
import { EditorType } from '../../Types/EditorType'

function createEditor(): EditorType {
    const presentation = createPresentation()

    return {
        presentation: presentation,
        selectedSlideId: presentation.orderedSlideIds[0],
        selectedBlockIds: []
    }
}

function createPresentation(): PresentationType {
    const defaultBackgroundColor = '#FFFFFF'
    const title = ''

    const slide: SlideType = {
        id: uuid(),
        background: {
            hexColor: defaultBackgroundColor,
            type: 'color',
        },
        blocks: []
    }

    const presentation: PresentationType = {
        title: title,
        orderedSlideIds: [],
        listSlides: new Map,
    }

    presentation.orderedSlideIds.push(slide.id)
    presentation.listSlides.set(slide.id, slide)

    return presentation
}

function renamePresentation(editor: EditorType, {newTitle}: {newTitle: string}): EditorType {
    const newPresentation = { ...editor.presentation }

    newPresentation.title = newTitle

    return {
        ...editor,
        presentation: newPresentation
    }
}

export {
    createEditor,
    createPresentation,
    renamePresentation
}
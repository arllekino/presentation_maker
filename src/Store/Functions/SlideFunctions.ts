import { EditorType } from '../../Types/EditorType'
import { SlideType } from '../../Types/SlideType'
import { v4 as uuid } from 'uuid'

function createSlide(editor: EditorType): EditorType {
    const defaultBackgroundColor = '#FFFFFF'
    
    const newSlide: SlideType = {
        id: uuid(),
        background: {
            hexColor: defaultBackgroundColor,
            type: 'color',
        },
        blocks: []
    }

    const newPresentation = { ...editor.presentation }

    newPresentation.listSlides.set(newSlide.id, newSlide)
    newPresentation.orderedSlideIds.push(newSlide.id)

    
    return {
        ...editor,
        presentation: newPresentation,
        selectedSlideId: newSlide.id
    }
}

function deleteSlide(editor: EditorType, {slideId}: {slideId: string}): EditorType {
    const modPresentation = { ...editor.presentation }
    const currentSlideIndex = modPresentation.orderedSlideIds.indexOf(slideId)

    modPresentation.listSlides.delete(slideId)

    const newCurrentSlideId = modPresentation.orderedSlideIds[currentSlideIndex + 1] ?? modPresentation.orderedSlideIds[currentSlideIndex - 1]

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: modPresentation.listSlides,
            orderedSlideIds: modPresentation.orderedSlideIds.filter((id) => id != slideId)
        },
        selectedSlideId: newCurrentSlideId
    }
}

function selectSlide(editor: EditorType, { slideId }: { slideId: string }): EditorType {
    const newEditor = {
        ...editor,
        selectedSlideId: slideId
    }
    newEditor.selectedBlockIds = []

    return newEditor
}

function changeSlidePosition(editor: EditorType, { id, newPosition }: { id: string, newPosition: number }): EditorType {
    const orderedSlideIds = editor.presentation.orderedSlideIds
    const indexSlide = orderedSlideIds.indexOf(id)

    orderedSlideIds.splice(indexSlide, 1)
    orderedSlideIds.splice(newPosition - 1, 0, id)

    const newPresentation = {
        ...editor.presentation,
        orderedSlideIds: orderedSlideIds
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function setBackgroundImageSlide(editor: EditorType, { slideId, path }: { slideId: string | null; path: string }): EditorType {
    if (slideId == null) {
        return editor
    }

    const slide = editor.presentation.listSlides.get(slideId)

    if (slide == null) {
        return editor
    }

    const newSlide = {
        ...slide,
        background: {
            path: path,
            type: 'image' as const,
        }
    }

    const newListSlides = new Map(editor.presentation.listSlides)
    newListSlides.set(slideId, newSlide)

    const newPresentation = {
        ...editor.presentation,
        listSlides: newListSlides
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function setBackgroundColorSlide(editor: EditorType, { slideId, hexColor }: { slideId: string | null, hexColor: string }): EditorType {
    if (slideId == null) {
        return editor
    }

    const slide = editor.presentation.listSlides.get(slideId)

    if (slide == null) {
        return editor
    }

    const newSlide = {
        ...slide,
        background: {
            hexColor: hexColor,
            type: 'color' as const,
        }
    }

    const newListSlides = new Map(editor.presentation.listSlides)
    newListSlides.set(slideId, newSlide)

    const newPresentation = {
        ...editor.presentation,
        listSlides: newListSlides
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

export {
    createSlide,
    deleteSlide,
    selectSlide,
    changeSlidePosition,
    setBackgroundImageSlide,
    setBackgroundColorSlide
}
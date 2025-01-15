import { EditorType } from '../../Types/EditorType'
import { GradientPoint, SlideType } from '../../Types/SlideType'
import { v4 as uuid } from 'uuid'

function createSlide(editor: EditorType): EditorType {
    const defaultBackgroundColor = '#FFFFFF';

    const newSlide: SlideType = {
        id: uuid(),
        background: {
            hexColor: defaultBackgroundColor,
            type: 'color',
        },
        blocks: [],
    };

    const newListSlides: Map<string, SlideType> = new Map(editor.presentation.listSlides)
    newListSlides.set(newSlide.id, newSlide)

    const newPresentation = {
        ...editor.presentation,
        listSlides: newListSlides,
        orderedSlideIds: [...editor.presentation.orderedSlideIds, newSlide.id],
    };

    return {
        ...editor,
        presentation: newPresentation,
        selectedSlideIds: [newSlide.id],
    };
}

function deleteSlide(editor: EditorType): EditorType {
    const newListSlides = new Map(editor.presentation.listSlides);
    console.log(123);

    let newOrderedSlideIds: string[] = []
    editor.selectedSlideIds.forEach(selectedSlideId => {
        newListSlides.delete(selectedSlideId)
        newOrderedSlideIds = editor.presentation.orderedSlideIds.filter(id => id != selectedSlideId);
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newListSlides,
            orderedSlideIds: newOrderedSlideIds,
        },
        selectedSlideIds: newOrderedSlideIds.length ? [newOrderedSlideIds[0]] : [],
    }
}

function selectSlide(editor: EditorType, { slideId }: { slideId: string }): EditorType {
    const newEditor = {
        ...editor,
        selectedSlideIds: [slideId]
    }

    return newEditor
}

function addSlideToSelection(editor: EditorType, { slideId }: { slideId: string }): EditorType {
    const newEditor = {
        ...editor,
        selectedSlideIds: [...editor.selectedSlideIds, slideId]
    }

    return newEditor
}

function changeSlidePosition(editor: EditorType, { id, newPosition }: { id: string, newPosition: number }): EditorType {
    const orderedSlideIds = [...editor.presentation.orderedSlideIds]
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

function setBackgroundGradientSlide(editor: EditorType, { slideId, points, angle }: { slideId: string, points: GradientPoint[], angle: number }): EditorType {
    const slide = editor.presentation.listSlides.get(slideId)

    console.log(123);


    if (slide == null) {
        return editor
    }

    const newSlide = {
        ...slide,
        background: {
            type: 'gradient' as const,
            points: points,
            angle: angle
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

function makeImageBlockAsBackground(editor: EditorType, { imageSlideObjectId }: { imageSlideObjectId: string }): EditorType {
    const slide = editor.presentation.listSlides.get(editor.selectedSlideIds[0] || '')
    if (!slide) {
        return editor
    }

    const slideObject = slide.blocks.find(block => block.id == imageSlideObjectId)

    const newSlide = {
        ...slide,
        backgroundAsImageBlockId: slideObject?.id || ''
    }

    const newListSlides = new Map(editor.presentation.listSlides)
    newListSlides.set(slide.id, newSlide)

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
    addSlideToSelection,
    changeSlidePosition,
    setBackgroundImageSlide,
    setBackgroundColorSlide,
    setBackgroundGradientSlide,
    makeImageBlockAsBackground
}
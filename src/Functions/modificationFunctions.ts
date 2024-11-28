import { v4 as uuid } from 'uuid'
import { PresentationType } from '../Types/PresentationType'
import { SlideType } from '../Types/SlideType'
import { ImageSlideObject, TextSlideObject } from '../Types/SlideObjectTypes'
import { EditorType } from '../Types/EditorType'
import isEditorValid from '../Utils/Validation/ValidateEditor'
import { DefaultSlideSetting } from '../Utils/DefaultSlideSettings'

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

function deleteSlide(editor: EditorType): EditorType {
    const slideId = editor.selectedSlideId

    if (slideId == null) {
        return editor
    }

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

function renamePresentation(editor: EditorType, newTitle: string): EditorType {
    const newPresentation = { ...editor.presentation }

    newPresentation.title = newTitle

    return {
        ...editor,
        presentation: newPresentation
    }
}

function unsetSelectedSlideObject(editor: EditorType, { slideObjectId }: { slideObjectId: string }): EditorType {
    const newSelected = editor.selectedBlockIds.filter(id => id != slideObjectId)

    return {
        ...editor,
        selectedBlockIds: newSelected
    }
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

function selectBlock(editor: EditorType, { blockId }: { blockId: string }): EditorType {
    return {
        ...editor,
        selectedBlockIds: [blockId]
    }
}

function addBlockToSelected(editor: EditorType, { blockId }: { blockId: string }): EditorType {
    if (editor.selectedBlockIds.includes(blockId)) {
        return editor
    }
    const newSelected = [...editor.selectedBlockIds, blockId]

    return {
        ...editor,
        selectedBlockIds: newSelected
    }
}

function deleteBlockFromSelected(editor: EditorType, { blockId }: { blockId: string }): EditorType {
    return {
        ...editor,
        selectedBlockIds: editor.selectedBlockIds.filter(id => id != blockId)
    }
}

function raiseOverlayPriority(editor: EditorType, { slideObject }: { slideObject: ImageSlideObject | TextSlideObject }): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)

    if (currentSlide == null) {
        return editor
    }

    const indexBlock = currentSlide.blocks.indexOf(slideObject)
    if (indexBlock == currentSlide.blocks.length - 1) {
        return editor
    }

    const newBlocks = currentSlide.blocks
    const temp = currentSlide.blocks[indexBlock].overlayPriority

    newBlocks[indexBlock].overlayPriority = newBlocks[indexBlock + 1].overlayPriority
    newBlocks[indexBlock + 1].overlayPriority = temp

    const newCurrentSlide = {
        ...currentSlide,
        blocks: newBlocks
    }

    const presentation = {
        ...editor.presentation,
        listSlides: editor.presentation.listSlides.set(currentSlide.id, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: presentation
    }
}

function lowerOverlayPriority(editor: EditorType, { slideObject }: { slideObject: ImageSlideObject | TextSlideObject }): EditorType {

    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)

    if (currentSlide == null) {
        return editor
    }

    const indexBlock = currentSlide.blocks.indexOf(slideObject)
    if (indexBlock == 0 || indexBlock == currentSlide.blocks.length - 1) {
        return editor
    }

    const newBlocks = currentSlide.blocks
    const temp = currentSlide.blocks[indexBlock].overlayPriority

    newBlocks[indexBlock].overlayPriority = newBlocks[indexBlock - 1].overlayPriority
    newBlocks[indexBlock - 1].overlayPriority = temp


    const newCurrentSlide = {
        ...currentSlide,
        blocks: newBlocks
    }

    const presentation = {
        ...editor.presentation,
        listSlides: editor.presentation.listSlides.set(currentSlide.id, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: presentation
    }
}

type TextBlockProps = {
    x: number,
    y: number,
    width: number,
    height: number,
    content: string
}

function createTextBlock(editor: EditorType, { x, y, width, height, content }: TextBlockProps): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const defaultContent = ''
    const defaultBackgroundColor = '#FFFFFF00'
    const defaultFontFamily = 'Times New Roman'
    const defaultOpacity = 1
    const defaultFontSize = 50
    const defaultFontColor = '#000000'
    const defaultTypeText = 'text_block'
    const defaultIsFixed = false
    // вынести в шаблон 

    const textSlideObject: TextSlideObject = {
        id: uuid(),
        coordinates: {
            x: x,
            y: y,
        },
        size: {
            width: width,
            height: height,
        },
        content: content ? content : defaultContent,
        backgroundColor: defaultBackgroundColor,
        opacity: defaultOpacity,
        font: {
            family: defaultFontFamily,
            size: defaultFontSize,
            hexColor: defaultFontColor,
        },
        overlayPriority: getHighOverlayPriority(currentSlide.blocks) + 1,
        border: null,
        type: defaultTypeText,
        isFixed: defaultIsFixed
    }

    const newCurrentSlide = {
        ...currentSlide,
        blocks: [...currentSlide.blocks, textSlideObject]
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: editor.presentation.listSlides.set(currentSlide.id, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation,
        selectedBlockIds: [textSlideObject.id]
    }
}

type ImageBlockProps = {
    x: number
    y: number
    width: number
    height: number
    path: string
}

function createImageBlock(editor: EditorType, { x, y, width, height, path }: ImageBlockProps): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const defaultOpacity = 1
    const defaultBorder = null
    const defaultTypeImage = 'image_block'
    const defaultIsFixed = false
    // вынести в шаблон 

    const imageSlideObject: ImageSlideObject = {
        id: uuid(),
        coordinates: {
            x: x,
            y: y,
        },
        size: {
            width: width,
            height: height
        },
        opacity: defaultOpacity,
        overlayPriority: getHighOverlayPriority(currentSlide.blocks) + 1,
        border: defaultBorder,
        imagePath: path,
        type: defaultTypeImage,
        isFixed: defaultIsFixed
    }

    const newCurrentSlide = {
        ...currentSlide,
        blocks: [...currentSlide.blocks, imageSlideObject]
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: editor.presentation.listSlides.set(currentSlide.id, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation,
        selectedBlockIds: [imageSlideObject.id]
    }
}

function deleteBlocksFromSlide(editor: EditorType): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const selectedBlockIds = editor.selectedBlockIds

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const newCurrentSlide = {
        ...currentSlide,
        blocks: currentSlide.blocks.filter(SlideObject => !selectedBlockIds.includes(SlideObject.id)),
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: editor.presentation.listSlides.set(currentSlide.id, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation,
        selectedBlockIds: editor.selectedBlockIds.filter(blockId => selectedBlockIds.includes(blockId))
    }
}

function setLocking(editor: EditorType, { isLocked }: { isLocked: boolean }): EditorType {

    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map((block) => {
        if (editor.selectedBlockIds.includes(block.id)) {
            return {
                ...block,
                isFixed: isLocked
            }
        }
        return block
    })

    const newSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newListSlides = editor.presentation.listSlides.set(newSlide.id, newSlide)

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: newListSlides
        }
    }
}

function changeBlockPosition(editor: EditorType, { newX, newY }: { newX: number, newY: number }): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map(block => {
        if (editor.selectedBlockIds.includes(block.id)) {
            return {
                ...block,
                coordinates: {
                    x: newX,
                    y: newY
                }
            }
        }
        return block
    })

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function resizeBlock(editor: EditorType, { newWidth, newHeight }: { newWidth: number, newHeight: number }): EditorType {
    if (newWidth <= 0 || newHeight <= 0) {
        return editor
    }

    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map(block => {
        if (editor.selectedBlockIds.includes(block.id)) {
            return {
                ...block,
                size: {
                    width: newWidth,
                    height: newHeight
                }
            }
        }
        return block
    })

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function setOpacityToBlock(editor: EditorType, newOpacity: number): EditorType {
    if (newOpacity < 0 || newOpacity > 1) {
        return editor
    }

    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map(block => {
        if (editor.selectedBlockIds.includes(block.id)) {
            return {
                ...block,
                opacity: newOpacity
            }
        }
        return block
    })

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockContent(editor: EditorType, { id, newContent }: { id: string, newContent: string }): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const block = currentSlide.blocks.find(block => block.id == id)
    if (block == undefined) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.filter(block => block.id != id)
    if (block.type == 'text_block') {
        block.content = newContent
    }
    updatedBlocks.push(block)

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontFamily(editor: EditorType, newFontFamily: string): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map(block => {
        if (editor.selectedBlockIds.includes(block.id) && block.type == 'text_block') {
            return {
                ...block,
                font: {
                    ...block.font,
                    family: newFontFamily
                }
            }
        }
        return block
    })

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontSize(editor: EditorType, newFontSize: number): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map(block => {
        if (editor.selectedBlockIds.includes(block.id) && block.type == 'text_block') {
            return {
                ...block,
                font: {
                    ...block.font,
                    size: newFontSize
                }
            }
        }
        return block
    })

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontColor(editor: EditorType, newFontColor: string): EditorType {
    if (editor.selectedSlideId == null) {
        return editor
    }

    const currentSlide = editor.presentation.listSlides.get(editor.selectedSlideId)
    if (currentSlide == null) {
        return editor
    }

    const updatedBlocks = currentSlide.blocks.map(block => {
        if (editor.selectedBlockIds.includes(block.id) && block.type == 'text_block') {
            return {
                ...block,
                font: {
                    ...block.font,
                    hexColor: newFontColor
                }
            }
        }
        return block
    })

    const newCurrentSlide = {
        ...currentSlide,
        blocks: updatedBlocks
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides).set(editor.selectedSlideId, newCurrentSlide)
    }

    return {
        ...editor,
        presentation: newPresentation
    }
}

function getHighOverlayPriority(blocks: Array<TextSlideObject | ImageSlideObject>): number {
    return blocks.length
}

function saveDocument(editor: EditorType): EditorType {
    localStorage.clear()
    
    const listSlidesObject = Object.fromEntries(editor.presentation.listSlides)

    const editorCopy = {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: listSlidesObject,
        },
    }
    
    if (isEditorValid(editor)) {
        const editorJSON = JSON.stringify(editorCopy)
        localStorage.setItem('editor', editorJSON)
    }

    return editor
}

function saveDocumentToFile(editor: EditorType): EditorType {
    const filename = DefaultSlideSetting.saveFilename
    const listSlidesObject = Object.fromEntries(editor.presentation.listSlides)

    const editorCopy = {
        ...editor,
        presentation: {
            ...editor.presentation,
            listSlides: listSlidesObject,
        },
    }
    
    if (isEditorValid(editor)) {
        const editorJSON = JSON.stringify(editorCopy)
        const file = new Blob([editorJSON], {type: 'application/json'})
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        link.click()
    
        URL.revokeObjectURL(url)
    }

    return editor
}

function getDocument(): EditorType | undefined {
    const editorJSON = localStorage.getItem('editor')
    if (editorJSON == null) {
        return undefined
    }

    const editor = JSON.parse(editorJSON)

    if (editor.presentation && typeof editor.presentation.listSlides == 'object') {
        editor.presentation.listSlides = new Map(Object.entries(editor.presentation.listSlides))
    }

    if (!isEditorValid(editor)) {
        return createEditor()
    }

    return editor as EditorType
}

function loadDocumentFromJSON(editor: EditorType, {editorJSON}: {editorJSON: string}): EditorType | undefined {
    const newEditor = JSON.parse(editorJSON)


    if (newEditor.presentation && typeof newEditor.presentation.listSlides == 'object') {
        newEditor.presentation.listSlides = new Map(Object.entries(newEditor.presentation.listSlides))
    }
    
    if (!isEditorValid(newEditor)) {
        return editor
    }

    return newEditor as EditorType
}

export {
    createEditor,
    createPresentation,
    createSlide,
    deleteSlide,
    selectSlide,
    unsetSelectedSlideObject,
    renamePresentation,
    changeSlidePosition,
    setBackgroundColorSlide,
    setBackgroundImageSlide,
    selectBlock,
    addBlockToSelected,
    deleteBlockFromSelected,
    setLocking,
    createTextBlock,
    createImageBlock,
    deleteBlocksFromSlide,
    changeTextBlockContent,
    changeBlockPosition,
    resizeBlock,
    setOpacityToBlock,
    changeTextBlockFontFamily,
    changeTextBlockFontSize,
    changeTextBlockFontColor,
    raiseOverlayPriority,
    lowerOverlayPriority,
    getDocument,
    loadDocumentFromJSON,
    saveDocument,
    saveDocumentToFile
}
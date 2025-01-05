import { EditorType } from '../../Types/EditorType'
import { ImageSlideObject, TextSlideObject } from '../../Types/SlideObjectTypes'
import { v4 as uuid } from 'uuid'

function unsetSelectedSlideObject(editor: EditorType, { slideObjectId }: { slideObjectId: string }): EditorType {
    const newSelected = editor.selectedBlockIds.filter(id => id != slideObjectId)

    return {
        ...editor,
        selectedBlockIds: newSelected
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    presentation.listSlides.set(currentSlide.id, newCurrentSlide)

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
        listSlides: new Map(editor.presentation.listSlides)
    }
    presentation.listSlides.set(currentSlide.id, newCurrentSlide)

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
    const { selectedSlideId, presentation } = editor;

    if (!selectedSlideId || !presentation.listSlides.has(selectedSlideId)) {
        return editor;
    }

    const currentSlide = presentation.listSlides.get(selectedSlideId);
    if (!currentSlide) {
        return editor
    }

    const defaultProps = {
        content: '',
        backgroundColor: '#FFFFFF00',
        fontFamily: 'Times New Roman',
        opacity: 1,
        fontSize: 50,
        fontColor: '#000000',
        typeText: 'text_block',
        isFixed: false,
        rotation: 0,
        fontWeight: 400
    };

    const textSlideObject: TextSlideObject = {
        id: uuid(),
        coordinates: { x, y },
        size: { width, height },
        content: content || defaultProps.content,
        backgroundColor: defaultProps.backgroundColor,
        opacity: defaultProps.opacity,
        font: {
            family: defaultProps.fontFamily,
            size: defaultProps.fontSize,
            hexColor: defaultProps.fontColor,
            weight: defaultProps.fontWeight
        },
        overlayPriority: getHighOverlayPriority(currentSlide.blocks) + 1,
        border: null,
        type: 'text_block',
        isFixed: defaultProps.isFixed,
        rotation: defaultProps.rotation,
    }

    const newCurrentSlide = {
        ...currentSlide,
        blocks: [...currentSlide.blocks],
    }
    newCurrentSlide.blocks.push(textSlideObject)

    const newListSlides = new Map(presentation.listSlides)
    newListSlides.set(currentSlide.id, newCurrentSlide)

    const newPresentation = {
        ...presentation,
        listSlides: newListSlides
    }

    return {
        ...editor,
        presentation: newPresentation,
        selectedBlockIds: [textSlideObject.id],
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
    const { selectedSlideId, presentation } = editor;

    if (!selectedSlideId || !presentation.listSlides.has(selectedSlideId)) {
        return editor;
    }

    const currentSlide = presentation.listSlides.get(selectedSlideId);
    if (!currentSlide) {
        return editor;
    }

    const defaultProps = {
        opacity: 1,
        border: null,
        typeImage: 'image_block',
        isFixed: false,
        rotation: 0
    };

    const imageSlideObject: ImageSlideObject = {
        id: uuid(),
        coordinates: { x, y },
        size: { width, height },
        opacity: defaultProps.opacity,
        overlayPriority: getHighOverlayPriority(currentSlide.blocks) + 1,
        border: defaultProps.border,
        imagePath: path,
        type: 'image_block',
        isFixed: defaultProps.isFixed,
        rotation: defaultProps.rotation
    };

    const newCurrentSlide = {
        ...currentSlide,
        blocks: [...currentSlide.blocks],
    }
    newCurrentSlide.blocks.push(imageSlideObject)

    const newListSlides = new Map(presentation.listSlides)
    newListSlides.set(currentSlide.id, newCurrentSlide)

    const newPresentation = {
        ...presentation,
        listSlides: newListSlides
    }

    return {
        ...editor,
        presentation: newPresentation,
        selectedBlockIds: [imageSlideObject.id],
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(currentSlide.id, newCurrentSlide)

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

    const newListSlides = new Map(editor.presentation.listSlides)
    newListSlides.set(newSlide.id, newSlide)

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

    const newListSlides = new Map(editor.presentation.listSlides)
    newListSlides.set(editor.selectedSlideId, newCurrentSlide)

    const newPresentation = {
        ...editor.presentation,
        listSlides: newListSlides
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function setOpacityToBlock(editor: EditorType, { newOpacity }: { newOpacity: number }): EditorType {
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function replaceImage(editor: EditorType, { id, newPath }: { id: string, newPath: string }): EditorType {
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

    if (block.type == 'text_block') {
        return editor
    }

    const newBlock = {
        ...block,
        imagePath: newPath
    }

    const newSlide = {
        ...currentSlide,
        blocks: currentSlide.blocks.filter(block => {
            if (block.id == newBlock.id) {
                return newBlock
            }
            return block
        })
    }

    const newPresentation = {
        ...editor.presentation,
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontFamily(editor: EditorType, { newFontFamily }: { newFontFamily: string }): EditorType {
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontSize(editor: EditorType, { newFontSize }: { newFontSize: number }): EditorType {
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontColor(editor: EditorType, { newFontColor }: { newFontColor: string }): EditorType {
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function changeTextBlockFontWeight(editor: EditorType, { newFontWeight }: { newFontWeight: number }): EditorType {
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
                    weight: newFontWeight
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
        listSlides: new Map(editor.presentation.listSlides)
    }
    newPresentation.listSlides.set(editor.selectedSlideId, newCurrentSlide)

    return {
        ...editor,
        presentation: newPresentation
    }
}

function getHighOverlayPriority(blocks: Array<TextSlideObject | ImageSlideObject>): number {
    return blocks.length
}

export {
    unsetSelectedSlideObject,
    selectBlock,
    addBlockToSelected,
    deleteBlockFromSelected,
    setLocking,
    createTextBlock,
    createImageBlock,
    deleteBlocksFromSlide,
    changeTextBlockContent,
    replaceImage,
    changeBlockPosition,
    resizeBlock,
    setOpacityToBlock,
    changeTextBlockFontFamily,
    changeTextBlockFontSize,
    changeTextBlockFontColor,
    changeTextBlockFontWeight,
    raiseOverlayPriority,
    lowerOverlayPriority,
}
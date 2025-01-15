import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import popOverStyles from '../../components/ImagesPopOver/ImagesPopOver.module.css'
import styles from './TopBar.module.css'
import buttonStyles from '../../components/Button/Button.module.css'
import ListButton from '../../components/ListButton/ListButton'
import listButtonStyles from '../../components/ListButton/ListButton.module.css'
import ButtonInput from '../../components/Button/ButtonInput'
import useLanguageItems from '../../components/ListButton/Lists/LanguageItems'
import { v4 as uuid } from 'uuid'
import useLoadFromFileEditor from '../../Utils/LoadFromFIleEditor'
import handleImageUploadEvent from '../../Utils/InputSet/useGetImageSetter'
import { useAppActions } from '../../Store/Hooks/useAppActions'
import { HistoryContext } from '../../Store/History/HistoryContext'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../Store/Hooks/useAppSelector'
import { useConvertPresentationToPdf } from '../../Utils/PDF/useConvertPresentationToPdf'
import { getUnsplashImages } from '../../Services/GetUnsplashImages'
import { ImagesPopOver } from '../../components/ImagesPopOver/ImagesPopOver'
import { UnsplashImageType } from '../../Services/UnsplahImageType'
import { useCreatePopOverImagesFromUnsplash } from '../../Utils/CreatePopOverImagesFromUnsplash'
import { Link } from 'react-router'

function TopBar() {
    const { t, i18n } = useTranslation()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const closeMenu = () => setIsMenuOpen(false)

    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [images, setImages] = useState<UnsplashImageType[] | undefined>(undefined)
    const [isPopOverImagesOpen, setIsPopOverImagesOpen] = useState(false)
    const togglePopOverImages = () => setIsPopOverImagesOpen(!isPopOverImagesOpen)
    const closePopOverImages = () => setIsPopOverImagesOpen(false)

    const listItems = useLanguageItems(listButtonStyles.iconFlag)
    const {
        setEditor,
        createImageBlock,
        createTextBlock,
        deleteBlocksFromSlide,
        renamePresentation,
        saveDocumentToFile,
        unsetSelectionSlideObjects
    } = useAppActions()
    const presentationTitle = useAppSelector((state => state.presentation.title))
    const currentBlockId = useAppSelector((state => state.selectedBlockIds[0]))
    const history = React.useContext(HistoryContext)
    const undoStackSize = useSelector(() => history.undoStackSize())
    const redoStackSize = useSelector(() => history.redoStackSize())

    const onUndo = () => {
        const newEditor = history.undo()
        if (newEditor && history.undoStackSize()) {
            setEditor(newEditor)
        }
    }

    const onRedo = () => {
        const newEditor = history.redo()
        if (newEditor && history.redoStackSize()) {
            setEditor(newEditor)
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isRedo = (event.ctrlKey || event.metaKey) && (event.key == 'y' || event.key == 'н')
            const isUndo = (event.ctrlKey || event.metaKey) && (event.key == 'z' || event.key == 'я')

            if (isRedo) {
                event.preventDefault()
                onRedo()
            }
            if (isUndo) {
                event.preventDefault()
                onUndo()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    useEffect(() => {
        const fetchImages = async () => {
            const result = await getUnsplashImages(searchValue, page)
            setImages(result || [])
        }

        if (isPopOverImagesOpen) {
            fetchImages()
        }
    }, [searchValue, isPopOverImagesOpen, page])


    const onTitleChange: React.ChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        renamePresentation((event.target as HTMLInputElement).value)
    }

    const setTextBlock = () => {
        createTextBlock({
            x: 400,
            y: 400,
            width: 300,
            height: 50,
            content: ''
        })
    }

    const generatePdf = useConvertPresentationToPdf(presentationTitle)
    const handlePdfExport = async () => {
        await generatePdf()
    }

    const loadFromFile = useLoadFromFileEditor

    const handlePreviewPresentation = () => {
        unsetSelectionSlideObjects(currentBlockId)
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Ошибка при попытке открыть полноэкранный режим: ${err.message} (${err.name})`);
        })
    }

    return (
        <div className={styles.topBar}>
            <ButtonInput
                labelId={uuid()}
                className={styles.title}
                action={onTitleChange}
                inputType='text'
                value={presentationTitle}
                placeholder={t('presentationTitlePlaceholder')}
            />

            <div className={buttonStyles.actionLog}>
                <Button
                    className={buttonStyles.undo}
                    action={onUndo}
                    icon={{
                        path: '/src/assets/icon_undo.svg',
                        className: `${buttonStyles.iconUndo} ${!undoStackSize ? buttonStyles.iconUndoEmpty : ''} ${i18n.language == 'ar' ? styles.iconRtl : ''}`,
                    }}
                />

                <Button
                    className={buttonStyles.redo}
                    action={onRedo}
                    icon={{
                        path: '/src/assets/icon_redo.svg',
                        className: `${buttonStyles.iconRedo} ${!redoStackSize ? buttonStyles.iconRedoEmpty : ''} ${i18n.language == 'ar' ? styles.iconRtl : ''}`,
                    }}
                />
            </div>

            <div className={buttonStyles.addItem}>
                <Button
                    className={buttonStyles.addTextBlock}
                    action={setTextBlock}
                    text={t('addTextBlockPlaceholder')}
                    icon={{
                        path: 'src/assets/icon_add_text_block.svg',
                        className: buttonStyles.iconAddTextBlock
                    }}
                />

                <ButtonInput
                    labelId={uuid()}
                    className={buttonStyles.addImageBlock}
                    inputType='file'
                    action={(event) => handleImageUploadEvent(event, createImageBlock)}
                    text={t('addImageBlockPlaceholder')}
                    icon={{
                        path: 'src/assets/icon_add_image_block.svg',
                        className: buttonStyles.iconAddImageBlock,
                    }}
                />

                <ImagesPopOver
                    className={styles.imagesPopOver}
                    itemClassName={popOverStyles.item}
                    action={async () => {
                        let images: UnsplashImageType[] | undefined
                        await getUnsplashImages(searchValue, page).then(result => images = result)
                        setImages(images)
                    }}
                    toggle={togglePopOverImages}
                    onClose={closePopOverImages}
                    isOpen={isPopOverImagesOpen}
                    images={useCreatePopOverImagesFromUnsplash(images)}
                    text={t('loadFromInternet')}
                    icon={{
                        path: 'src/Assets/icon_image_loupe.svg',
                        className: styles.iconIMgaeLoupe
                    }}
                    search={{
                        searchAction: setSearchValue,
                        value: searchValue
                    }}
                    pageParams={{
                        page: page,
                        setPage: setPage
                    }}
                />

                <Button
                    className={buttonStyles.deleteBlock}
                    action={deleteBlocksFromSlide}
                    text={t('deleteBlockPlaceholder')}
                    icon={{
                        path: 'src/assets/icon_trash.svg',
                        className: buttonStyles.iconDeleteBlock,
                    }}
                />
            </div>

            <div className={styles.utils}>
                <Button
                    className={styles.saveAsPdf}
                    action={handlePdfExport}
                    text={t('saveAsPdf')}
                    icon={{
                        path: 'src/Assets/icon_pdf.png',
                        className: styles.iconPdf
                    }}
                />

                <Button
                    className={styles.saveTofile}
                    action={saveDocumentToFile}
                    text={t('save')}
                    icon={{
                        path: 'src/Assets/icon_save.svg',
                        className: ''
                    }}
                />

                <ButtonInput
                    labelId={uuid()}
                    className={styles.loadFromFile}
                    action={loadFromFile}
                    text={t('load')}
                    inputType={'file'}
                    icon={{
                        path: 'src/Assets/icon_save.svg',
                        className: styles.iconLoad
                    }}
                />

                <Link to='/previewPresentation' onClick={handlePreviewPresentation} className={styles.playButton}>
                    <img src="src/Assets/icon_play.png" className={styles.iconPlay} />
                    <span className={styles.playSpan}>{t('play')}</span>
                </Link>

                <div className={styles.languageWrap}>
                    <ListButton
                        className={buttonStyles.languageButton}
                        menuClassName={buttonStyles.menuLanguageButton}
                        action={toggleMenu}
                        onClose={closeMenu}
                        isOpen={isMenuOpen}
                        icon={{
                            path: getCurrentIconFlagPath(i18n.language),
                            className: buttonStyles.iconSettings,
                        }}
                        listItem={listItems}
                    />
                </div>
            </div>
        </div>
    )
}

function getCurrentIconFlagPath(language: string): string {
    let countryName: string
    switch (language) {
        case 'ru':
            countryName = 'russia'
            break
        case 'en':
            countryName = 'uk'
            break
        case 'ar':
            countryName = 'uae'
            break
        default:
            countryName = 'uk'
            break
    }

    return `src/assets/icon_${countryName}.svg`
}

export default TopBar
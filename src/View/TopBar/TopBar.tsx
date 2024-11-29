import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../../components/Button/Button'
import styles from './TopBar.module.css'
import buttonStyles from '../../components/Button/Button.module.css'
import ListButton from '../../components/ListButton/ListButton'
import listButtonStyles from '../../components/ListButton/ListButton.module.css'
import ButtonInput from '../../components/Button/ButtonInput'
import useLanguageItems from '../../Utils/ListItems/LanguageItems'
import getImageSetter from '../../Utils/InputSet/GetImageSetter'
import { v4 as uuid } from 'uuid'
import useLoadFromFileEditor from '../../Utils/LoadFromFIleEditor'
import { useAppActions } from '../../Store/Hooks/useAppActions'

function TopBar() {
    const { t, i18n } = useTranslation()

    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    const listItems = useLanguageItems(listButtonStyles.iconFlag)
    const { createTextBlock, deleteBlocksFromSlide, renamePresentation, saveDocumentToFile } = useAppActions()

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
    const setImage = getImageSetter
    const loadFromFile = useLoadFromFileEditor

    return (
        <div className={styles.topBar}>
            <input type='text' className={styles.title} placeholder={t('presentationTitlePlaceholder')} onChange={onTitleChange} />

            {/* <div className={buttonStyles.actionLog}>
                <Button
                    className={buttonStyles.undo}
                    action={someAction}
                    icon={{
                        path: '/src/assets/icon_undo.svg',
                        className: buttonStyles.iconUndo,
                    }}
                />

                <Button
                    className={buttonStyles.redo}
                    action={someAction}
                    icon={{
                        path: '/src/assets/icon_redo.svg',
                        className: buttonStyles.iconRedo,
                    }}
                />
            </div> */}


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
                    action={setImage}
                    text={t('addImageBlockPlaceholder')}
                    icon={{
                        path: 'src/assets/icon_add_image_block.svg',
                        className: buttonStyles.iconAddImageBlock,
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
                    className={styles.saveTofile}
                    action={saveDocumentToFile}
                    text={'Save'}
                />

                <ButtonInput
                    labelId={uuid()}
                    className={styles.loadFromFile}
                    action={loadFromFile}
                    text={'Load'}
                    inputType={'file'}
                />

                <div className={styles.languageWrap}>
                    <ListButton
                        className={buttonStyles.languageButton}
                        action={toggleMenu}
                        onClose={closeMenu}
                        isOpen={isOpen}
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
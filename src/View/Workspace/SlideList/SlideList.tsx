import styles from './SlideList.module.css'
import { useTranslation } from 'react-i18next'
import Slide from '../../../components/Slide/Slide'
import { DefaultSlideSetting } from '../../../Utils/DefaultSlideSettings'
import React, { useRef, useState } from 'react'
import useDraggableVertical from '../../../Store/Hooks/useDragAndDropVertical'
import ListButton, { ListItem } from '../../../components/ListButton/ListButton'
import listButtonStyles from '../../../components/ListButton/ListButton.module.css'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import { useAppActions } from '../../../Store/Hooks/useAppActions'

function SlideList() {
	const { t, i18n, } = useTranslation()

	const { deleteSlide, selectSlide } = useAppActions()

	const slideList = useRef<HTMLDivElement>(null)
	const [slideIdMenuOpen, setSlideIdMenuOpen] = useState('')


	const editor = useAppSelector((state => state))
	const orderedSlideIds = editor.presentation.orderedSlideIds
	const currentSlideId = editor.selectedSlideId
	const handleMouseDown = useDraggableVertical(orderedSlideIds, slideList)

	const deleteItem: ListItem = {
		text: t('deleteSlide'),
		action: deleteSlide,
		icon: {
			path: 'src/Assets/icon_trash.svg',
			className: listButtonStyles.deleteSlideIcon
		}
	}

	const listItems: ListItem[] = [deleteItem]

	return (
		<>
			<div className={styles.slideList} ref={slideList}>
				{orderedSlideIds.map((slideId, index) => {
					const onRightMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
						event.preventDefault()
						setSlideIdMenuOpen(slideId)
					}

					const stylesPreviewWrap: React.CSSProperties = {
						outline: `${slideId == currentSlideId ? '2px solid #3B82FA' : '1px solid #BABABA'}`
					}

					return (
						<React.Fragment key={slideId}>
							<div
								className={styles.previewSlide}
								onClick={() => selectSlide(slideId)}
								onMouseDown={handleMouseDown}
								onContextMenu={onRightMouseClick}
							>
								<span className={styles.slideIndex}>
									{i18n.language == 'ar' ? toArabicNumber(index + 1) : index + 1}
								</span>
								<div className={styles.previewWrap} style={stylesPreviewWrap}>
									<Slide
										slideId={slideId}
										scale={Number(DefaultSlideSetting.previewScale)}
									/>
								</div>

								{slideIdMenuOpen == slideId && (
									<ListButton
										className={listButtonStyles.menuSlide}
										action={() => { }}
										onClose={() => setSlideIdMenuOpen('')}
										listItem={listItems}
										isOpen={true}
									/>
								)}
							</div>
						</React.Fragment>
					);
				})}
			</div>
		</>
	);
}

function toArabicNumber(number: number): string {
	const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
	return String(number).split('').map(digit => arabicNumerals[Number(digit)]).join('')
}

export default SlideList
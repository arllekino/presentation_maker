import styles from './SlideList.module.css'
import { useTranslation } from 'react-i18next'
import Slide from '../../../components/Slide/Slide'
import { DefaultSlideSetting } from '../../../Utils/DefaultSlideSettings'
import React, { useEffect, useRef } from 'react'
import { useAppActions } from '../../../Store/Hooks/useAppActions'
import { useAppSelector } from '../../../Store/Hooks/useAppSelector'
import useDraggableVertical from '../../../components/Slide/useDragAndDropVertical'

function SlideList() {
	const { i18n, } = useTranslation()

	const { selectSlide, addSlideToSelection } = useAppActions()

	const slideList = useRef<HTMLDivElement>(null)

	const orderedSlideIds = useAppSelector((state => state.presentation.orderedSlideIds))
	const currentSlideId = useAppSelector((state => state.selectedSlideIds[0]))
	const selectedSlideIds = useAppSelector((state => state.selectedSlideIds))
	const handleMouseDown = useDraggableVertical(slideList)
	const currentSlideRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (currentSlideRef.current) {
			currentSlideRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			})
		}
	}, [currentSlideId]);

	return (
		<>
			<div className={styles.slideList} ref={slideList}>
				{orderedSlideIds.map((slideId, index) => {
					const isCurrent = selectedSlideIds.includes(slideId)

					const handleClickSlide: React.MouseEventHandler<HTMLDivElement> = (event) => {
						if (event.ctrlKey) {
							addSlideToSelection(slideId)
						} else {
							selectSlide(slideId)
						}
					}

					const stylesPreviewWrap: React.CSSProperties = {
						outline: `${isCurrent ? '2px solid #3B82FA' : '1px solid #BABABA'}`
					}

					return (
						<React.Fragment key={slideId}>
							<div
								className={styles.previewSlide}
								onClick={handleClickSlide}
								onMouseDown={handleMouseDown}
								ref={isCurrent ? currentSlideRef : null}
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
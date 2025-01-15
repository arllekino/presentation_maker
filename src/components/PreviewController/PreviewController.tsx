import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './PreviewController.module.css';

type PreviewControllerProps = {
    escape: () => void;
    next: () => void;
    prev: () => void;
};

function PreviewController(props: PreviewControllerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [mouseTimer, setMouseTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleMouseMove = () => {
            setIsVisible(true)

            if (mouseTimer) {
                clearTimeout(mouseTimer);
            }

            const newTimer = setTimeout(() => {
                setIsVisible(false);
            }, 2000)

            setMouseTimer(newTimer);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (mouseTimer) {
                clearTimeout(mouseTimer);
            }
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [mouseTimer]);

    return (
        <div className={`${styles.previewController} ${!isVisible ? styles.hidden : ''}`}>
            <Button
                className={styles.buttonStyles}
                action={props.escape}
                icon={{
                    path: 'src/Assets/icon_cross.svg',
                    className: `${styles.iconController} ${styles.iconCross}`,
                }}
            />
            <Button
                className=''
                action={props.prev}
                icon={{
                    path: 'src/Assets/icon_next_arrow.svg',
                    className: `${styles.iconPrevArrow} ${styles.iconController}`,
                }}
            />
            <Button
                className=''
                action={props.next}
                icon={{
                    path: 'src/Assets/icon_next_arrow.svg',
                    className: `${styles.iconNextArrow} ${styles.iconController}`,
                }}
            />
        </div>
    )
}

export default PreviewController;

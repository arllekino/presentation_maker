import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { createRoot } from 'react-dom/client'
import { useCreateSlidesAsJSX } from './useCreateSlidesAsJSX'
import { Provider } from 'react-redux'
import { store } from '../../Store/Redux/Store'
import { flushSync } from 'react-dom'

function useConvertPresentationToPdf(title: string) {
    const slidesAsJSX = useCreateSlidesAsJSX()

    return async function generatePdf() {
        const tempContainer = document.createElement('div')
        tempContainer.style.position = 'absolute'
        tempContainer.style.top = '-10000px'
        document.body.appendChild(tempContainer)

        const root = createRoot(tempContainer)

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [800, 450]
        })

        for (let i = 0; i < slidesAsJSX.length; i++) {
            const slideJSX = slidesAsJSX[i]

            flushSync(() => {
                root.render(
                    <Provider store={store}>
                        {slideJSX}
                    </Provider>
                )
            })

            await new Promise<void>((resolve) => {
                requestAnimationFrame(() => {
                    const slideHtml = tempContainer.firstChild as HTMLElement

                    if (slideHtml) {
                        html2canvas(slideHtml).then((slideCanvas) => {
                            const pdfWidth = pdf.internal.pageSize.getWidth()
                            const pdfHeight = pdf.internal.pageSize.getHeight()

                            pdf.addImage(
                                slideCanvas.toDataURL('image/png'),
                                'PNG',
                                0,
                                0,
                                pdfWidth,
                                pdfHeight
                            )

                            if (i < slidesAsJSX.length - 1) {
                                pdf.addPage()
                            }

                            resolve()
                        })
                    } else {
                        resolve()
                    }
                })
            })
        }

        pdf.save(title ? `${title}.pdf` : 'presentation.pdf')

        root.unmount()
        document.body.removeChild(tempContainer)

    }
}

export {
    useConvertPresentationToPdf
}
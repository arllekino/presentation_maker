import { GradientPoint } from '../../Types/SlideType'

function startGradientPoints(): GradientPoint[] {
    const startPoint: GradientPoint = {
        color: '#FFFFFF',
        range: 0
    }

    const endPoint: GradientPoint = {
        color: '#000000',
        range: 1
    }

    return [startPoint, endPoint]
}

function addPoint(points: GradientPoint[], setterCurrentPos: (pos: number) => void): GradientPoint[] {
    const getRange = () => {
        return (points[points.length - 1].range + points[points.length - 2].range) / 2;
    }

    const getColor = () => {
        return averageHexColor(points[points.length - 1].color, points[points.length - 2].color);
    }

    const newPoint: GradientPoint = {
        color: getColor(),
        range: getRange()
    }

    points.splice(points.length - 1, 0, newPoint)

    setterCurrentPos(points.length - 2)
    return [...points]
}

function deletePoint(points: GradientPoint[], setterCurrentPos: (pos: number) => void, currentPos: number): GradientPoint[] {
    if (points.length <= 2) {
        return [...points]
    }

    points.splice(currentPos, 1)

    if (currentPos != 0) {
        setterCurrentPos(currentPos - 1)
    }

    return [...points]
}

function setColorToPoint(points: GradientPoint[], position: number, newColor: string): GradientPoint[] {
    points[position].color = newColor
    
    return [...points]
}

function setRangeToPoint(points: GradientPoint[], newRange: number, currentPos: number): GradientPoint[] {
    points[currentPos].range = newRange

    return [...points]
}

function averageHexColor(hex1: string, hex2: string) {
    const rgb1 = hexToRgb(hex1)
    const rgb2 = hexToRgb(hex2)

    const r = Math.round((rgb1[0] + rgb2[0]) / 2)
    const g = Math.round((rgb1[1] + rgb2[1]) / 2)
    const b = Math.round((rgb1[2] + rgb2[2]) / 2)

    return rgbToHex(r, g, b)
}

function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return [r, g, b]
}

function rgbToHex(r: number, g: number, b: number) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`
}


export {
    startGradientPoints,
    addPoint,
    setColorToPoint,
    deletePoint,
    setRangeToPoint
}
import { IRGBA, toRGBA } from './color-converter'
import { ColorMixer } from './color-mixer'

type TUITheme = 'light' | 'dark'

const cache: { [color: string]: IColorBrightness | null } = {}

// outputs brightness range between 0 and 1
// accepts a hex, rgb or rgba color string
export function ColorBrightness(color: string | IRGBA | null, theme: TUITheme = 'light', lightBase?: string, darkBase?: string): IColorBrightness | null {

  if (typeof color === 'string') {
    color = toRGBA(color)
  }

  if (color === null ){
    throw new Error('Unable to parse the color input')
  }

  const colorString = color.toString()

  if (typeof cache[colorString] === 'undefined') {

    let brightness = digitalRGBLuma(color)

    const transparency = 1 - Math.max(0, Math.min(color.a, 1))

    let alignedWithTheme = false

    if (transparency > 0) {
      const lighterColor = new ColorMixer(color, lightBase, darkBase).lighten(transparency)
      const darkerColor  = new ColorMixer(color, lightBase, darkBase).darken(transparency)
      if (lighterColor && darkerColor) {
        const lightModeBrightness = digitalRGBLuma(lighterColor)
        const darkModeBrightness = digitalRGBLuma(darkerColor)
        alignedWithTheme = brightnessToThemeMode(lightModeBrightness) !== brightnessToThemeMode(darkModeBrightness)
        if (theme === 'light') brightness = lightModeBrightness
        else brightness = darkModeBrightness
      }
    }

    cache[colorString] = {
      color: colorString,
      luma : brightness,
      mode : !alignedWithTheme ? brightnessToThemeMode(brightness): 'default'
    }

  }

  return cache[colorString]

}

const brightnessToThemeMode = (brightness: number): TUITheme => {
  return brightness < 0.60 ? 'dark' : 'light'
}

const photometricRGBLuma = (rgb: IRGBA): number => {
  return ((0.2126 * rgb.r) + (0.7152 * rgb.g) + (0.0722 * rgb.b)) / 255
}

// alternate luma algorithm
const digitalRGBLuma = (rgb: IRGBA): number => {
  return ((0.299 * rgb.r) + (0.587 * rgb.g) + (0.114 * rgb.b)) / 255
}

export interface IColorBrightness {
  color: string
  luma  : number
  mode  : 'light' | 'dark' | 'default'
}


# @blueshiftone/color-utils

Provides utilities for mixing colors (including with alpha) and extracting perceived color brightness.
## Features

- Mix two colors
- Extract perceived brightness (based on a digital rgb luma algorithm)
- Supports hex, rgb and rgba input
- Accepts light/dark mode options and extracts brightness of semi-transparent colors based on the theme background color

**Note:** this package is for a browser environment only, as we rely on `document.createElement("canvas")` for mixing colors with transparency
## Installation

```bash
  npm install @blueshiftone/color-utils
```
    
## Usage/Examples

```javascript
import { ColorMixer, ColorBrightness } from '@blueshiftone/color-utils'

const color1 = '#fe45fc'
const color2 = 'rgba(100, 20, 54, 0.5)'

const combinedColor = new ColorMixer(color1).mix(color2)

console.log(combinedColor.toString()) // rgba(177, 44, 153, 1)

const brightness = ColorBrightness(combinedColor)

console.log(brightness.luma) // 0.37722745098039207
console.log(brightness.mode) // dark

const currentAppTheme = 'dark'
const appLightBackground = '#ffffff'
const appDarkBackground = '#000000'

const brightnessThemed = ColorBrightness(color2, currentAppTheme, appLightBackground, appDarkBackground)

```

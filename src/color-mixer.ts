import { IRGBA, RGBA, toRGBA } from './color-converter'

export class ColorMixer {

  private readonly darkBase : IRGBA
  private readonly lightBase: IRGBA
  private readonly color    : IRGBA

  constructor(color: IRGBA | string | null, lightBase = 'rgb(250, 250, 250)', darkBase = 'rgb(43, 45, 49)') {
    if (typeof color === 'string') {
      color = toRGBA(color)
    }
    if (color === null) {
      throw new Error('Unable to parse the color input')
    }
    const light = toRGBA(lightBase)
    const dark  = toRGBA(darkBase)
    if (!light) throw new Error("Unable to parse the light base color")
    if (!dark) throw new Error("Unable to parse the dark base color")
    this.lightBase = light
    this.darkBase  = dark
    this.color     = color
  }

  public lighten(percent: number) {
    this.lightBase.a = this._clamp(percent)
    return this.mix(this.lightBase.toString())
  }

  public darken(percent: number) {
    this.darkBase.a = this._clamp(percent)
    return this.mix(this.darkBase.toString())
  }

  // Draw colors on canvas and extract pixel value
  public mix(color2: string): IRGBA {
    
    const c  = document.createElement("canvas")
    c.width  = 10
    c.height = 10

    const ctx = c.getContext("2d")!

    ctx.fillStyle = this.color.toString()
    ctx.fillRect(0, 0, 10, 10)

    ctx.fillStyle = color2
    ctx.fillRect(0, 0, 10, 10)

    const data = ctx.getImageData(1, 1, 1, 1).data

    let [r, g, b, a] = data
    return new RGBA( r, g, b, a / 255 )
  }

  private _clamp(n: number) {
    return Math.max(0.01, Math.min(0.99, n))
  }

}

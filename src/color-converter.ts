export function toRGBA(color: string): IRGBA | null {
  let matchResults: RegExpExecArray | null = null
  color = color.trim()

  if (matchResults = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)) { // hex
    return new RGBA(
      parseInt(matchResults[1], 16), // r
      parseInt(matchResults[2], 16), // g
      parseInt(matchResults[3], 16), // b
      1,                             // a
    )
  } else if (matchResults = /^rgb(?:\s+)?\((?:\s+)?(\d+)(?:\s+)?,(?:\s+)?(\d+)(?:\s+)?,(?:\s+)?(\d+)(?:\s+)?\)$/i.exec(color)) { // rgb
    return new RGBA(
      parseInt(matchResults[1], 10), // r
      parseInt(matchResults[2], 10), // g
      parseInt(matchResults[3], 10), // b
      1,                             // a
    )
  } else if (matchResults = /^rgb(?:a)?(?:\s+)?\((?:\s+)?(\d+)(?:\s+)?,(?:\s+)?(\d+)(?:\s+)?,(?:\s+)?(\d+)(?:\s+)?,(?:\s+)?([0-9\.]+)(?:\s+)?\)$/i.exec(color)) { // rgba
    return new RGBA(
      parseInt(matchResults[1], 10), // r
      parseInt(matchResults[2], 10), // g
      parseInt(matchResults[3], 10), // b
      parseFloat(matchResults[4]),   // a
    )
  }

  return null
}

export class RGBA implements IRGBA {
  constructor(
    public r: number = 0,
    public g: number = 0,
    public b: number = 0,
    public a: number = 1
  ) {}

  public toString(): string {
    const { r, g, b, a } = this
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

}

export interface IRGBA {
  r: number
  g: number
  b: number
  a: number
  toString(): string
}

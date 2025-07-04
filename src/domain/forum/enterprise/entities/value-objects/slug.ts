export class Slug {
  public value: string
  constructor(value: string) {
    this.value = value
  }

  static createFromText(text: string) {
    console.log({
      textformatted: text.replace(/\s+/g, '-').toLocaleLowerCase(),
    })
    const slugText = text
      .replace(/\s+/g, '-')
      .toLocaleLowerCase()
      .normalize('NFKD')
      .trim()
      .replace(/_/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/, '-')
      .replace(/$-/g, '')
    return new Slug(slugText)
  }
}

export class Slug {
  public value: string
  private constructor(value: string) {
    this.value = value
  }
  static create(value:string){
    return new Slug(value)
  }
  static createFromText(text: string) {

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

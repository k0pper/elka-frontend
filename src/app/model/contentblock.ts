export class ContentBlock {
  name: string;

  setName(name: string): ContentBlock {
    this.name = name;
    return this;
  }
}

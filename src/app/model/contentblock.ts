export class ContentBlock {
  name: string;
  isDone: boolean;

  setName(name: string): ContentBlock {
    this.name = name;
    return this;
  }
  setIsDone(isDone: boolean): ContentBlock {
    this.isDone = isDone;
    return this;
  }
}

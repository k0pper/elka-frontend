import { ContentBlock } from '../model/contentblock';

export class ContentBlockFactory {
  constructor() {}

  static getContentBlock(): ContentBlock {
    let contentBlock: ContentBlock = new ContentBlock()
      .setName("Schleifen")
      .setIsDone(false);
    return contentBlock;
  }
}

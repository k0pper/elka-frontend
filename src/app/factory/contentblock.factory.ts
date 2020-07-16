import { ContentBlock } from '../model/contentblock';
import * as contentblocks from './data/contentblocks.json'

export class ContentBlockFactory {
  constructor() {}

  static getRandomContentBlock(): ContentBlock {
    let allContentBlocks = ((contentblocks as any).default as ContentBlock[])
    console.log("allCourses", allContentBlocks)
    console.log("getRandomCourse", allContentBlocks[Math.floor(Math.random() * allContentBlocks.length)])
    return allContentBlocks[Math.floor(Math.random() * allContentBlocks.length)]
  }

  static getNRandomContentBlocks(n: number): ContentBlock[] {
    let allContentBlocks = ((contentblocks as any).default as ContentBlock[]);
    let returnContentBlocks = []
    for (var i = 0; i < n; i++) {
      if (!returnContentBlocks.includes(allContentBlocks[i])) {
        returnContentBlocks.push(allContentBlocks[i])
      }
    }
    return returnContentBlocks;
  }
}

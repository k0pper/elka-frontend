import { Degree } from '../model/degree';
import { CourseFactory } from './course.factory';
import * as degrees from './data/degrees.json'

export class DegreeFactory {
  constructor() {}

  static getRandomDegree(shortName?: string): Degree {
    let allDegrees = ((degrees as any).default as Degree[])
    if (!shortName) {
      console.log("allDegrees", allDegrees)
      console.log("getRandomDegree", allDegrees[Math.floor(Math.random() * allDegrees.length)])
      return allDegrees[Math.floor(Math.random() * allDegrees.length)]
    }
    else {
      return allDegrees.find((degree) => degree.shortName == shortName)
    }
  }
}

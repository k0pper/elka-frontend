import { Course } from '../model/course';
import * as courses from './data/courses.json'

export class CourseFactory {
  constructor() {}
    static getRandomCourse(): Course {
      let allCourses = ((courses as any).default as Course[])
      console.log("allCourses", allCourses)
      console.log("getRandomCourse", allCourses[Math.floor(Math.random() * allCourses.length)])
      return allCourses[Math.floor(Math.random() * allCourses.length)]
    }

    static getNRandomCourses(n: number): Course[] {
      let allCourses = ((courses as any).default as Course[]);
      let returnCourses = []
      for (var i = 0; i < n; i++) {
        if (!returnCourses.includes(allCourses[i])) {
          returnCourses.push(allCourses[i])
        }
      }
      return returnCourses;

    }
  }

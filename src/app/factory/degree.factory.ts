import { Degree } from '../model/degree';
import { CourseFactory } from './course.factory';

export class DegreeFactory {
  constructor() {}

  static getDegree(): Degree {
    let degree: Degree = new Degree();
    degree.setName("Mikrobiologie")
       .setDescription("Mikrobiologie ist fresh?")
       .setShortName("MBL")
       .setEctsNeeded(300)
       .setValidCourses(CourseFactory.getRandomCourse());
    console.log("DegreeFactory created Degree:");
    console.log(degree);
    return degree;
  }
}

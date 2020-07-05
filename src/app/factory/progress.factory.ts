import { Degree } from '../model/degree';
import { CourseFactory } from './course.factory';
import { Progress } from '../model/progress';

export class ProgressFactory {
  constructor() {}

  static getProgress(): Progress {
    let progress: Progress = new Progress().setRefDegreeShortName("ITP")
      .setCurrentSemester(4)
      .setSemestersStudied(3)
      .setFinishedCourses([CourseFactory.getCourse()])
    return progress;
  }
}

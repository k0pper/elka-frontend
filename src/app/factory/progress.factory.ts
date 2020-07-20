import { Degree } from '../model/degree';
import { CourseFactory } from './course.factory';
import { Progress } from '../model/progress';
import { ScheduledSemesterFactory } from './scheduled.semester.factory';
import { Course } from '../model/course';

export class ProgressFactory {
  constructor() {}

  static getProgress(): Progress {
    let progress: Progress = new Progress()
      .setRefDegreeShortName("IWI")
      .setCurrentSemester(1);
    return progress;
  }
}

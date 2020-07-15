import { CourseFactory } from './course.factory';
import { ScheduledSemester } from '../model/scheduled.semester';
import { CourseProgressFactory } from './course.progress.factory';

export class ScheduledSemesterFactory {
  constructor() {}

  static getScheduledSemester(): ScheduledSemester {
    let scheduledSemester = new ScheduledSemester()
      .setIndex(1)
      .setFromDate(new Date(2020, 9, 1))
      .setToDate(new Date(2021, 2, 28))
      .setScheduledCourseProgresses([CourseProgressFactory.getCourseProgress()]);
    return scheduledSemester;
  }
}

import { CourseProgress } from './course.progress';

export class ScheduledSemester {
  index: number;
  fromDate: Date;
  toDate: Date;
  scheduledCourses: CourseProgress[];

  setIndex(index: number): ScheduledSemester {
    this.index = index;
    return this;
  }
  setFromDate(fromDate: Date): ScheduledSemester {
    this.fromDate = fromDate;
    return this;
  }
  setToDate(toDate: Date): ScheduledSemester {
    this.toDate = toDate;
    return this;
  }
  setScheduledCourseProgresses(scheduledCourses: CourseProgress[]): ScheduledSemester {
    this.scheduledCourses = scheduledCourses;
    return this;
  }
}

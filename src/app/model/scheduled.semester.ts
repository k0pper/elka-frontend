import { Course } from './course';

export class ScheduledSemester {
  index: number;
  fromDate: Date;
  toDate: Date;
  scheduledCourses: Course[];

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
  setScheduledCourses(scheduledCourses: Course[]): ScheduledSemester {
    this.scheduledCourses = scheduledCourses;
    return this;
  }
}

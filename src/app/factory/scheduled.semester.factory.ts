import { ScheduledSemester } from '../model/scheduled.semester';
import * as scheduledSemesters from './data/scheduled-semesters.json';

export class ScheduledSemesterFactory {
  constructor() {}

  static getScheduledSemesters(): ScheduledSemester[] {
    return (scheduledSemesters as any).default as ScheduledSemester[];
  }

  static getNEmptySemesters(n: number, startIndex: number): ScheduledSemester[] {
    let scheduledSemesters: ScheduledSemester[] = [];
    for (let i = startIndex; i<startIndex+n; ++i) {
      scheduledSemesters.push(
        new ScheduledSemester()
        .setIndex(i)
        .setScheduledCourses([])
        .setFromDate(new Date())
        .setToDate(new Date())
      );
    }
    return scheduledSemesters;
  }
}

import { CourseFactory } from './course.factory';
import { ScheduledSemester } from '../model/scheduled.semester';
import * as scheduledSemesters from './data/scheduled-semesters.json';

export class ScheduledSemesterFactory {
  constructor() {}

  static getScheduledSemesters(): ScheduledSemester[] {
    return (scheduledSemesters as any).default as ScheduledSemester[];
  }
}

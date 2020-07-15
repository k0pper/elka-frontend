import { Course } from './course';
import { ScheduledSemester } from './scheduled.semester';

export class Progress {
  refDegreeShortName: string;
  currentSemester: number;
  finishedCourses: Course[];
  scheduledSemesters: ScheduledSemester[];


  setRefDegreeShortName(degreeShortName: string): Progress {
    this.refDegreeShortName = degreeShortName;
    return this;
  }

  setCurrentSemester(currentSemester: number): Progress {
    this.currentSemester = currentSemester;
    return this;
  }

  setFinishedCourses(finishedCourses: Course[]): Progress {
    this.finishedCourses = finishedCourses;
    return this;
  }

  setScheduledSemesters(scheduledSemesters: ScheduledSemester[]): Progress {
    this.scheduledSemesters = scheduledSemesters;
    return this;
  }

}

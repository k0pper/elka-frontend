import { Course } from './course';

export class Progress {
  refDegreeShortName: string;
  semestersStudied: number;
  currentSemester: number;
  finishedCourses: Course[];


  setRefDegreeShortName(degreeShortName: string): Progress {
    this.refDegreeShortName = degreeShortName;
    return this;
  }

  setSemestersStudied(semestersStudied: number): Progress {
    this.semestersStudied = semestersStudied;
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

}

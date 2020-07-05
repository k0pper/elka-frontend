import { Course } from './course';

// Abschluss / Studiengang
export class Degree {
  name: string;
  shortName: string;
  description: string;
  ectsNeeded: number;
  validCourses: Course[];

  constructor() {}

  setName(name: string): Degree {
    this.name = name;
    return this;
  }
  setShortName(shortName: string): Degree {
    this.shortName = shortName;
    return this;
  }
  setDescription(description: string): Degree {
    this.description = description;
    return this;
  }
  setEctsNeeded(ectsNeeded: number): Degree {
    this.ectsNeeded = ectsNeeded;
    return this;
  }

  setValidCourses(validCourses: Course[] | Course): Degree {
    if (validCourses instanceof Course) {
      this.validCourses = [validCourses]
    } else if (validCourses instanceof Array) {
      this.validCourses = validCourses;
    } else {
      console.error("parameter 'courses' in Degree.setCourses expected a different type of arg")
    }
    return this;
  }
}

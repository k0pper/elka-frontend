import { Course } from './course';

export enum WEEKDAYS {
  MONDAY = "Montag",
  TUESDAY = "Dienstag",
  WEDNESDAY = "Mittwoch",
  THURSDAY = "Donnerstag",
  FRIDAY = "Freitag",
}

export class RegularLecture extends Object {
  course: Course;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  weekday: WEEKDAYS;
  location: string;

  setCourse(course: Course): RegularLecture {
    this.course = course;
    return this;
  }

  setStartHour(startHour: number): RegularLecture {
    this.startHour = startHour;
    return this;
  }

  setStartMinute(startMinute: number): RegularLecture {
    this.startMinute = startMinute;
    return this;
  }

  setEndMinute(endMinute: number): RegularLecture {
    this.endMinute = endMinute;
    return this;
  }

  setEndHour(endHour: number): RegularLecture {
    this.endHour = endHour;
    return this;
  }

  setWeekday(weekday: WEEKDAYS): RegularLecture {
    this.weekday = weekday;
    return this;
  }

  setLocation(location: string): RegularLecture {
    this.location = location;
    return this;
  }
}

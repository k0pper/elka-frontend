import { Course } from '../model/course';

export class CourseFactory {
  constructor() {}

  static getCourse(): Course {
    let course: Course = new Course();
    course.setName("Programmieren 1")
      .setEcts(5)
      .setProfessor("Martin Luther King")
      .setTags(["Programmieren", "Algorithmen", "Code", "Entwicklung", "Abstraktes Denken"])
     return course;
  }
}

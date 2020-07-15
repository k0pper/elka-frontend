import { CourseProgress } from '../model/course.progress';
import { ContentBlockFactory } from './contentblock.factory';
import { CourseFactory } from './course.factory';
import { Course } from '../model/course';

export class CourseProgressFactory {
  constructor() {}

  static getCourseProgress(): CourseProgress {
    let course: CourseProgress = new CourseProgress()
      .setCourse(CourseFactory.getRandomCourse())
      .setContentBlocks([ContentBlockFactory.getContentBlock(), ContentBlockFactory.getContentBlock()]);
     return course;
  }
}

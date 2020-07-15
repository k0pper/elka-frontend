import { ContentBlock } from './contentblock';
import { Course } from './course';

export class CourseProgress {
  course: Course;
  contentBlocks: ContentBlock[];
  isDone: boolean;

  setCourse(course: Course): CourseProgress {
    this.course = course;
    return this;
  }
  setContentBlocks(contentBlocks: ContentBlock[]): CourseProgress {
    this.contentBlocks = contentBlocks;
    return this;
  }
  setIsDone(isDone: boolean): CourseProgress {
    this.isDone = isDone;
    return this;
  }
}

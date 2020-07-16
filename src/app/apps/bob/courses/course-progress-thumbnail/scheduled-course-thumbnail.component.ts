import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'scheduled-course',
  templateUrl: './scheduled-course-thumbnail.component.html',
  styleUrls: ['./scheduled-course-thumbnail.component.scss']
})
export class ScheduledCourseComponent implements OnInit {
  @Input() course: Course;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {

  }

  getDoneContentBlocksPercentage() {
    let n = 0;
    let contentBlocks = this.course.mandatoryContentBlocks
    for (let cb of contentBlocks) {
      if (cb.isDone) n += 1
    }
    return Math.floor((n / contentBlocks.length) * 100)
  }

  courseDone() {
    return !this.course.mandatoryContentBlocks.map(course => course.isDone).includes(false);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Input() user: User;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {

  }

  getDoneContentBlocksPercentage() {
    return this.courseService.getDoneContentBlocksPercentage(this.user, this.course);
  }

  courseDone() {
    return this.getDoneContentBlocksPercentage() >= 100;
  }

  courseValid() {
    return this.user.plannedDegree.validCourses.map(m => m.name).includes(this.course.name);
  }
}

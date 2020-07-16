import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';
import { User } from 'src/app/model/user';

@Component({
  selector: 'scheduled-course',
  templateUrl: './scheduled-course-thumbnail.component.html',
  styleUrls: ['./scheduled-course-thumbnail.component.scss']
})
export class ScheduledCourseComponent implements OnInit {
  @Input() course: Course;
  @Input() user: User;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {

  }

  getDoneContentBlocksPercentage() {
    let mandatory = this.course.mandatoryContentBlocks;
    let finished = this.user.finishedContentBlocks;
    let n = 0;
    for (let finishedBlock of finished) {
      if ( mandatory.map(m => m.name).includes(finishedBlock.name) ) n +=1;
    }
    return Math.floor((n / mandatory.length) * 100)
  }

  courseDone() {
    return this.getDoneContentBlocksPercentage() >= 100;
  }

  courseValid() {
    return this.user.plannedDegree.validCourses.map(m => m.name).includes(this.course.name);
  }

  invalidMessage() {
    return `Der Kurs ${this.course.name} ist nicht Teil \
      des Studiengangs ${this.user.plannedDegree.name}. \
      Um deine Leistungen in passenden Kursen \
      anrechnen zu lassen, kontaktiere den jeweiligen Kursverantwortlichen.`
  }

}

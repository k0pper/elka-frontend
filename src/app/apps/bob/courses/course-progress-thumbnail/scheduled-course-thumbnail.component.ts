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
    return this.courseService.getDoneContentBlocksPercentage(this.user, this.course);
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

  finishedMessage() {
    return `Du hast alle Inhaltsblöcke des Kurses ${this.course.name} abgeschlossen!`
  }

}

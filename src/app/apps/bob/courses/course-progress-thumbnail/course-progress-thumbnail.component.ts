import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseProgress } from 'src/app/model/course.progress';

@Component({
  selector: 'course-progress',
  templateUrl: './course-progress-thumbnail.component.html',
  styleUrls: ['./course-progress-thumbnail.component.scss']
})
export class CourseProgressComponent implements OnInit {
  @Input() courseProgress: CourseProgress;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {

  }

}

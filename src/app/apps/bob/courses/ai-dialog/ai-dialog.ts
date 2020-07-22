import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/users.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AIService } from 'src/app/services/ai.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';

@Component({
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.25s ease-out',
              style({ height: 200, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 200, opacity: 1 }),
            animate('0.25s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    ),
    trigger('simpleFadeAnimation', [

      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),

      // fade out when destroyed. this could also be written as transition('void => *')
      transition(':leave',
        animate(600, style({ opacity: 0 })))
    ])
  ],
  selector: 'ai-dialog',
  templateUrl: 'ai-dialog.html',
  styleUrls: ['ai-dialog.scss']
})
export class AIDialogComponent {
  loading = false;
  done = false;
  message = "";

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  interests = [];
  excludes = [];


  constructor(public dialogRef: MatDialogRef<AIDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private userService: UserService, private aiService: AIService, private courseService: CourseService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }



  addInterest(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.interests.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeInterest(interest: string): void {
    const index = this.interests.indexOf(interest);

    if (index >= 0) {
      this.interests.splice(index, 1);
    }
  }

  addExclude(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.excludes.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeExclude(interest: string): void {
    const index = this.excludes.indexOf(interest);

    if (index >= 0) {
      this.excludes.splice(index, 1);
    }
  }

  getSuggestions() {
    let intervals = [0];

    intervals.push(
      Math.floor(Math.random() * 1500),
      Math.floor(Math.random() * 1500) + 1000,
      Math.floor(Math.random() * 1500) + 2000,
      Math.floor(Math.random() * 1500) + 3000,
      Math.floor(Math.random() * 1500) + 5500,
    )

    this.loading = true;
    this.aiService.getSuggestions()
      .subscribe(data => {
        setTimeout(() => {
          this.message = "Werte Interessen aus ..."
        }, intervals[0]);
        setTimeout(() => {
          this.message = "Filtere uninteressante Themen aus ..."
        }, intervals[1]);
        setTimeout(() => {
          this.message = "Werte positiv bewertete Kurse aus ..."
        }, intervals[2]);
        setTimeout(() => {
          this.message = "Vergleiche mit anderen Studierenden ..."
        }, intervals[3]);
        setTimeout(() => {
          this.message = "Erhalte Ergebnis ..."
        }, intervals[4]);
        setTimeout(() => {
          this.message = "Fertig! Deine passenden Kurse stehen bereit!"
          this.done = true;
        }, intervals[5]);
      });

  }

}

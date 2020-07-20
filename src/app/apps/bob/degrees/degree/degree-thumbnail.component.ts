import { Component, OnInit, Input } from '@angular/core';
import { Degree } from 'src/app/model/degree';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/users.service';
import { DegreeService } from 'src/app/services/degree.service';

@Component({
  selector: 'degree',
  templateUrl: './degree-thumbnail.component.html',
  styleUrls: ['./degree-thumbnail.component.scss']
})
export class DegreeComponent implements OnInit {
  @Input() degree: Degree;
  @Input() user: User;

  constructor(private userService: UserService, private degreeService: DegreeService) {}

  ngOnInit(): void {
    // this.degreeService.degreeChanged.subscribe((newDegree) => {
    //   console.log("caught event in thumbnail")
    //     console.log("my degree")
    //     this.degree = newDegree;
    // })
  }

  isCurrentDegree(): boolean {
    return this.degree.name == this.user.plannedDegree.name;
  }

  getFinishedEcts() {
    return this.userService.getFinishedEctsForDegree(this.user, this.degree);
  }

  getLostEcts() {
    return this.degreeService.getLostEcts(this.user, this.degree);
  }
}

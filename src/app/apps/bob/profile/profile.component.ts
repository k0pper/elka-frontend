import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';
import exportFromJSON from 'export-from-json'

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  downloadPersonalInformation() {
    const data = this.user;
    const fileName = `Persoenliche-Daten-${this.user.firstName}-${this.user.lastName}`
    const exportType = 'json'
    exportFromJSON({ data, fileName, exportType })
  }
}

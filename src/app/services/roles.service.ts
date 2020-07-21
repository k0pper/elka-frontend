import { Injectable } from '@angular/core';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable({providedIn: 'root'})
export class RolesService {
  constructor(private authService: AuthService, private userService: UserService) { }


}

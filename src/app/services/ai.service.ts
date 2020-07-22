import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AIService {
  constructor() { }

  getSuggestions() {
    return of("Test");
  }

}

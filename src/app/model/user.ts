import { Address } from './address';
import { add } from 'lodash';
import { Degree } from './degree';
import { Progress } from './progress';
import { ContentBlock } from './contentblock';
import { ScheduledSemester } from './scheduled.semester';

export enum ROLES {
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  ADMINISTRATION = "ADMINISTRATION",
  ADMIN = "ADMIN"
}

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: ROLES[]
  address: Address;

  plannedDegree: Degree;
  progresses: Progress[];
  finishedContentBlocks: ContentBlock[];
  scheduledSemesters: ScheduledSemester[];


  constructor(id) {
    this.id = id;
  }

  setEmail(email: string): User {
    this.email = email;
    return this;
  }
  setFirstName(firstName: string): User {
    this.firstName = firstName;
    return this;
  }
  setLastName(lastName: string): User {
    this.lastName = lastName;
    return this;
  }
  setRoles(roles: ROLES[]): User {
    this.roles = roles;
    return this;
  }
  setAddress(address: Address): User {
    this.address = address;
    return this;
  }
  setPlannedDegree(plannedDegree: Degree): User {
    this.plannedDegree = plannedDegree;
    return this;
  }
  setProgresses(progresses: Progress[]): User {
    this.progresses = progresses;
    return this;
  }
  setFinishedContentBlocks(contentBlocks: ContentBlock[]): User {
    this.finishedContentBlocks = contentBlocks;
    return this;
  }
  setScheduledSemesters(scheduledSemesters: ScheduledSemester[]): User {
    this.scheduledSemesters = scheduledSemesters;
    return this;
  }
}

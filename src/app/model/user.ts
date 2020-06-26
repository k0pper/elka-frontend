export enum ROLES {
  STUDENT = "STUDENT",
  PROFESSOR = "PROFESSOR",
  ADMINISTRATION = "ADMINISTRATION",
  ADMIN = "ADMIN"
}

export class User {
  id: string;
  email: string;
  roles: ROLES[]

  constructor(id, email, roles) {
    this.id = id;
    this.email = email;
    this.roles = roles;
  }
}

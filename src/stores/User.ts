export class User {
  id = '';
  firstName = '';
  lastName = '';
  email = '';

  constructor(id: string, firstName: string, lastName: string, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  get displayName() {
    return this.firstName + ' ' + this.lastName;
  }
}

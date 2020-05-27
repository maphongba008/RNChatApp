import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id = '';
  @Expose()
  firstName = '';
  @Expose()
  lastName = '';
  @Expose()
  email = '';
  @Expose()
  createdAt = 0;

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

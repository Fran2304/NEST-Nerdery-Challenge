import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      useranme: 'diana98',
      email: 'diana98@test.com',
      password: 'password',
    },
    {
      id: 2,
      useranme: 'fran',
      email: 'fran@test.com',
      password: 'password',
    },
  ];

  getUsers() {
    return this.users;
  }

  async findOne(email: string): Promise<any> {
    return this.users.find((user) => user.email === email);
  }
}

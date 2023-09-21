import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/schema.users';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
    );
    return result;
  }
}

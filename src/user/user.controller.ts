import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userDto';
import { LoginUserDto } from './dto/loginDto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.insertUser(
      createUserDto.firstname,
      createUserDto.lastname,
      createUserDto.email,
      createUserDto.password,
    );
    return { user, message: 'User created successfully' };
  }
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const token = await this.userService.login(loginDto);
    return { token, message: 'User login successfully' };
  }
}

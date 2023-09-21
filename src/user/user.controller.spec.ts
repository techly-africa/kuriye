import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/userDto';
import { LoginUserDto } from './dto/loginDto';

const userServiceMock = {
  insertUser: jest.fn(),
  login: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userServiceMock }],
    }).compile();

    userController = app.get<UserController>(UserController);
  });
  it('should create a new user', async () => {
    const createUserDto: CreateUserDto = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const user = {}; // Create a mock user object

    userServiceMock.insertUser.mockResolvedValue(user);

    const result = await userController.signup(createUserDto);

    expect(result).toEqual({ user, message: 'User created successfully' });
  });
  it('should log in a user', async () => {
    const loginDto: LoginUserDto = {
      email: 'john.doe@example.com',
      password: 'password123',
    };

    const token = 'mockToken'; // Create a mock token

    userServiceMock.login.mockResolvedValue(token);

    const result = await userController.login(loginDto);

    expect(result).toEqual({ token, message: 'User login successfully' });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schema/user.model';

const mockUserModel = {
  findOne: jest.fn(),
  countDocuments: jest.fn(),
  create: jest.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('insertUser', () => {
    it('should insert a new user', async () => {
      const userData = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      mockUserModel.countDocuments.mockReturnValue(0);
      mockUserModel.create.mockReturnValue({ id: 'someUserId' });

      const result = await userService.insertUser(
        userData.firstname,
        userData.lastname,
        userData.email,
        userData.password,
      );

      expect(result).toBe('someUserId');
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...userData,
        role: 'admin',
        password: expect.any(String),
      });
    });
  });

  describe('findOneByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';

      mockUserModel.findOne.mockReturnValue({ email });

      const user = await userService.findOneByEmail(email);

      expect(user).toEqual({ email });
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
    });
  });
});

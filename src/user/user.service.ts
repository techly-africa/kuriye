import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.model';
import { LoginUserDto } from './dto/loginDto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async insertUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    const userCount = await this.userModel.countDocuments();
    const role = userCount === 0 ? 'admin' : 'customer';

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
  async login(loginDto: LoginUserDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, 'secretKey', {
      expiresIn: '1h',
    });

    return token;
  }
}

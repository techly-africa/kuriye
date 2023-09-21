import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(10000);
    appModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});

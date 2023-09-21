// main.spec.ts
import { bootstrap } from './main';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(() => ({
      listen: jest.fn(),
    })),
  },
}));

describe('bootstrap', () => {
  it('should create Nest application and listen on port 3000', async () => {
    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(NestFactory.create).toHaveReturnedWith(
      expect.objectContaining({
        listen: expect.any(Function),
      }),
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { oneUserMockData } from '~/core/user/test/fixtures';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { mockAuthService } from './utils';

describe('Auth Controller', () => {
  let controller: AuthController;
  // let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    // service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('returns an access token', async () => {
      await expect(controller.login(oneUserMockData)).resolves.toHaveProperty(
        'access_token',
        'token',
      );
    });
  });

  describe('register', () => {
    it('returns a user object', async () => {
      await expect(
        controller.register({ email: 'test@mail.com', password: 'password' }),
      ).resolves.toMatchObject({
        email: 'test@mail.com',
        password: 'password',
      });
    });
  });
});

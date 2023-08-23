import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { oneUserMockData, userMockData } from '~/core/user/test/fixtures';
import { mockUserService } from '~/core/user/test/utils';
import { UserService } from '~/core/user/user.service';
import { PrismaService } from '~/lib/prisma.service';
import { AuthService } from '../auth.service';

const mockUserPrismaMethods = {
  user: {
    findMany: jest.fn().mockResolvedValue(userMockData),
    findUnique: jest.fn().mockResolvedValue(oneUserMockData),
    findFirst: jest.fn().mockResolvedValue(oneUserMockData),
    create: jest.fn().mockReturnValue(oneUserMockData),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneUserMockData),
    delete: jest.fn().mockResolvedValue(oneUserMockData),
  },
};

describe('AuthService', () => {
  let service: AuthService;
  // let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [JwtModule],
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockUserPrismaMethods,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation(() => 'token'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUserCredentials', () => {
    describe('given credentials are correct', () => {
      it('returns a user object', async () => {
        jest
          .spyOn(bcrypt, 'compare')
          .mockImplementationOnce(() => Promise.resolve(true));

        const validatedUser = await service.validateUserCredentials(
          'test1@mail.com',
          'password',
        );

        expect(validatedUser.email).toBe('test1@mail.com');
      });
    });

    describe('given credentials are invalid', () => {
      it('throws an unauthorized exception', async () => {
        jest
          .spyOn(bcrypt, 'compare')
          .mockImplementationOnce(() => Promise.resolve(false));

        await expect(
          service.validateUserCredentials('test1@mail.com', 'password'),
        ).rejects.toMatchObject({ message: 'Unauthorized' });
      });
    });

    describe("given an email that doesn't exist", () => {
      it('throws a not found exception', async () => {
        await expect(
          service.validateUserCredentials('notme@mail.com', 'password'),
        ).rejects.toMatchObject({ message: 'user not found' });
      });
    });
  });

  describe('login', () => {
    it('returns an access token', async () => {
      const { access_token } = await service.login({
        email: 'test1@mail.com',
        id: 1,
      });

      expect(access_token).toBe('token');
    });
  });

  describe('register', () => {
    describe('given an email not previously registered', () => {
      it('returns a newly registered user', async () => {
        const registeredUser = await service.register({
          email: 'test@mail.com',
          password: 'password',
        });

        expect(registeredUser).not.toBeNull();
      });
    });

    describe('given an already registered email', () => {
      it('throws an unprocessable entity exception', async () => {
        await expect(
          service.register({
            email: 'test1@mail.com',
            password: 'password',
          }),
        ).rejects.toHaveProperty(
          'message',
          'email has already been registered',
        );
      });
    });
  });
});

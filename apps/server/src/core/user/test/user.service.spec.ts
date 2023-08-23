import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';

import { PrismaService } from '~/lib/prisma.service';
import { UserService } from '../user.service';
import { oneUserMockData, userMockData } from './fixtures';

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

describe('UserService', () => {
  let service: UserService;
  // let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockUserPrismaMethods,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('returns an array of users', async () => {
      const users = await service.getUsers();
      expect(users).toEqual(userMockData);
    });
  });

  describe('getUser', () => {
    it('returns a single user', async () => {
      const user = await service.getUser({
        email: 'test1@mail.com',
      });
      expect(user).toEqual(oneUserMockData);
    });
  });

  describe('createUser', () => {
    it('creates a user and returns it', async () => {
      const newUserDTO: Prisma.UserCreateInput = {
        email: userMockData[0].email,
        password: userMockData[0].password,
      };

      expect(
        service.createUser({
          ...newUserDTO,
        }),
      ).resolves.toEqual(userMockData[0]);
    });
  });
});

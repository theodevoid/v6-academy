import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { oneUserMockData, userMockData } from './fixtures';
import { Prisma } from '@prisma/client';

describe('User Controller', () => {
  let controller: UserController;
  // let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue(userMockData),
            getUser: jest
              .fn()
              .mockImplementation((args: Prisma.UserWhereInput) =>
                Promise.resolve({
                  ...oneUserMockData,
                  email: args.email || oneUserMockData.email,
                  id: args.id || oneUserMockData.id,
                }),
              ),
            createUser: jest.fn().mockResolvedValue(oneUserMockData),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    // service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('returns an array of users', async () => {
      await expect(controller.getUsers()).resolves.toEqual(userMockData);
    });
  });
});

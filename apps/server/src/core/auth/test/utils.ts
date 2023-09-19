import { UnauthorizedException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { oneUserMockData } from '~/core/user/test/fixtures';

export const mockAuthService = {
  register: jest.fn().mockImplementation((args: Prisma.UserCreateInput) => {
    return Promise.resolve<User>({
      ...oneUserMockData,
      email: args.email as string,
      password: args.password as string,
    });
  }),
  login: jest.fn().mockResolvedValue({
    access_token: 'token',
  }),
  validateUserCredentials: jest
    .fn()
    .mockImplementation((email: string, password: string) => {
      if (password === 'password')
        return Promise.resolve<Omit<User, 'password'>>({
          createdAt: new Date(),
          email,
          id: 1,
          githubId: '1',
        });

      throw new UnauthorizedException();
    }),
};

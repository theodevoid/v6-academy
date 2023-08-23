import { Prisma } from '@prisma/client';

import { userMockData } from './fixtures';

export const mockUserService = {
  getUser: jest
    .fn()
    .mockImplementation((userWhereClause: Prisma.UserWhereInput) => {
      const findUser = userMockData.find(
        (user) =>
          user.email === userWhereClause.email ||
          user.id === userWhereClause.id,
      );
      if (findUser) {
        return findUser;
      }

      return null;
    }),
  createUser: jest.fn().mockImplementation((user: Prisma.UserCreateInput) => {
    return {
      ...user,
      id: 1,
      createdAt: new Date(),
    };
  }),
};

import { User } from '@prisma/client';

export const userMockData: User[] = [
  {
    id: 1,
    email: 'test1@mail.com',
    password: 'password',
    createdAt: new Date(),
  },
  {
    id: 2,
    email: 'test2@mail.com',
    password: 'password',
    createdAt: new Date(),
  },
  {
    id: 3,
    email: 'test3@mail.com',
    password: 'password',
    createdAt: new Date(),
  },
  {
    id: 4,
    email: 'test4@mail.com',
    password: 'password',
    createdAt: new Date(),
  },
];

export const oneUserMockData = userMockData[0];

import { Prisma } from '@prisma/client';

export const topicsTestData: Prisma.TopicCreateManyArgs['data'] = [
  {
    slug: 'react-tutorial-1',
    title: 'React Tutorial 1',
  },
  {
    slug: 'react-tutorial-2',
    title: 'React Tutorial 2',
  },
  {
    slug: 'react-tutorial-3',
    title: 'React Tutorial 3',
  },
];

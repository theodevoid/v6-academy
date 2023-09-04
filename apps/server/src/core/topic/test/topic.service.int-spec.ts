import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '~/lib/prisma.service';
import { TopicService } from '../topic.service';
import { topicsTestData } from './fixtures';

describe('TopicService', () => {
  let topicService: TopicService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService, PrismaService],
    }).compile();

    topicService = module.get<TopicService>(TopicService);
    prismaService = module.get<PrismaService>(PrismaService);

    await prismaService.topic.createMany({
      data: topicsTestData,
    });
  });

  afterAll(async () => {
    await prismaService.cleanDatabase();
  });

  it('should be defined', () => {
    expect(topicService).toBeDefined();
  });

  describe('getTopics', () => {
    it('should return a list of topics', async () => {
      const topics = await topicService.getTopics({});

      expect(topics.length).toBeGreaterThan(0);
    });

    describe('when given a slug', () => {
      it('should return an array containing 1 topic', async () => {
        const topicsBySlug = await topicService.getTopics({
          slug: 'react-tutorial-1',
        });

        expect(topicsBySlug.length).toBe(1);
        expect(topicsBySlug[0].slug).toBe('react-tutorial-1');
      });
    });
  });
});

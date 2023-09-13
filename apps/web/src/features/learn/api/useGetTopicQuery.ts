import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import { AxiosPromise } from 'axios';

import { axios } from '~/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

const topicDetails = Prisma.validator<Prisma.TopicDefaultArgs>()({
  include: {
    unit: true,
  },
});

export type TopicDetails = Prisma.TopicGetPayload<typeof topicDetails>;

export const getTopic = (id: number): AxiosPromise<TopicDetails> => {
  return axios.get(`/topics/${id}`);
};

type QueryFnType = typeof getTopic;

type UseGetTopicQueryOptions = {
  config?: QueryConfig<QueryFnType>;
  id: number;
};

export const useGetTopicQuery = ({ config, id }: UseGetTopicQueryOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['topics', id],
    queryFn: () => getTopic(id),
  });
};

import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import { AxiosPromise } from 'axios';

import { axios } from '~/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

const topic = Prisma.validator<Prisma.TopicDefaultArgs>()({});

export type Topic = Prisma.TopicGetPayload<typeof topic>;

export const getTopic = (id: number): AxiosPromise<Topic> => {
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

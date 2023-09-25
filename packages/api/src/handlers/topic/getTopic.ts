import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, ExtractFnReturnType, QueryConfig } from '~/lib/react-query';
import { useApiClient } from '~/providers';

const topicDetails = Prisma.validator<Prisma.TopicDefaultArgs>()({
  include: {
    unit: true,
  },
});

export type TopicDetails = Prisma.TopicGetPayload<typeof topicDetails>;

export const getTopic: ApiFn<{ id: number }, AxiosPromise<TopicDetails>> = (
  { id },
  { axios = defaultAxios },
) => {
  return axios.get(`/topics/${id}`);
};

type QueryFnType = typeof getTopic;

type UseGetTopicQueryOptions = {
  config?: QueryConfig<QueryFnType>;
  id: number;
};

export const useGetTopicQuery = ({ config, id }: UseGetTopicQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['topics', id],
    queryFn: () => getTopic({ id }, { axios }),
  });
};

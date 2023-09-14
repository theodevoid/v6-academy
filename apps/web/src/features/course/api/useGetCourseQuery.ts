import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import { AxiosPromise } from 'axios';

import { axios } from '~/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

const courseDetails = Prisma.validator<Prisma.CourseDefaultArgs>()({
  include: {
    author: true,
    category: true,
    units: {
      include: {
        topics: true,
      },
    },
  },
});

export type CourseDetails = Prisma.CourseGetPayload<typeof courseDetails>;

export const getCourseById = (id: number): AxiosPromise<CourseDetails> => {
  return axios.get(`/courses/${id}`);
};

type QueryFnType = typeof getCourseById;

type UseGetCourseQueryOptions = {
  courseId: number;
  config?: QueryConfig<QueryFnType>;
};

export const useGetCourseQuery = ({
  courseId,
  config,
}: UseGetCourseQueryOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['course', courseId],
    queryFn: () => getCourseById(courseId),
  });
};

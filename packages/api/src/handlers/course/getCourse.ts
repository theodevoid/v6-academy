import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import defaultAxios, { AxiosPromise } from 'axios';
import { ApiFn, ExtractFnReturnType, QueryConfig } from 'lib/react-query';
import { useApiClient } from 'providers';

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

export const getCourseById: ApiFn<
  { id: number },
  AxiosPromise<CourseDetails>
> = ({ id }, { axios = defaultAxios }): AxiosPromise<CourseDetails> => {
  return axios.get(`/courses/${id}`);
};

export type GetCourseQueryFnType = typeof getCourseById;

type UseGetCourseQueryOptions = {
  courseId: number;
  config?: QueryConfig<GetCourseQueryFnType>;
};

export const useGetCourseQuery = ({
  courseId,
  config,
}: UseGetCourseQueryOptions) => {
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<GetCourseQueryFnType>>({
    ...config,
    queryKey: ['course', courseId],
    queryFn: () => getCourseById({ id: courseId }, { axios }),
  });
};

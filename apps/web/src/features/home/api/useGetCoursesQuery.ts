import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import { GetCoursesDTO } from '@v6-academy/dto';
import { AxiosPromise } from 'axios';

import { PageableResponse } from '~/utils/pagination';
import { axios } from '~/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '~/lib/react-query';

const courseWithUnitsCountAndAuthor =
  Prisma.validator<Prisma.CourseDefaultArgs>()({
    include: {
      _count: {
        select: {
          units: true,
        },
      },
      author: true,
      units: true,
    },
  });

export type CourseWithUnitsCountAndAuthor = Prisma.CourseGetPayload<
  typeof courseWithUnitsCountAndAuthor
>;

export const getCourses = (
  getCoursesDTO: GetCoursesDTO,
): AxiosPromise<PageableResponse<CourseWithUnitsCountAndAuthor>> => {
  return axios.get('/courses', { params: getCoursesDTO });
};

type QueryFnType = typeof getCourses;

type UseGetCoursesQueryOptions = {
  config?: QueryConfig<QueryFnType>;
  getCoursesDTO: GetCoursesDTO;
};

export const useGetCoursesQuery = ({
  config,
  getCoursesDTO,
}: UseGetCoursesQueryOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['courses'],
    queryFn: () => getCourses(getCoursesDTO),
  });
};

import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';
import { GetCoursesDTO } from '@v6-academy/dto';
import defaultAxios, { AxiosPromise } from 'axios';

import { ApiFn, ExtractFnReturnType, QueryConfig } from '~/lib/react-query';
import { useApiClient } from '~/providers';
import { PageableResponse } from '~/types/pagination';

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

export const getCourses: ApiFn<
  GetCoursesDTO,
  AxiosPromise<PageableResponse<CourseWithUnitsCountAndAuthor>>
> = (getCoursesDTO, { axios = defaultAxios }) => {
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
  const { axios } = useApiClient();

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['courses'],
    queryFn: () => getCourses(getCoursesDTO, { axios }),
  });
};

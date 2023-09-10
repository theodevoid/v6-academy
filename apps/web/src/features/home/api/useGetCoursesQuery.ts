import { useQuery } from '@tanstack/react-query';
import { Prisma } from '@v6-academy/db';

import { PageableResponse } from '~/utils/pagination';
import { useApiClient } from '~/providers/ApiClientProvider';

const courseWithUnitsCountAndAuthor =
  Prisma.validator<Prisma.CourseDefaultArgs>()({
    include: {
      _count: {
        select: {
          units: true,
        },
      },
      author: true,
    },
  });

export type CourseWithUnitsCountAndAuthor = Prisma.CourseGetPayload<
  typeof courseWithUnitsCountAndAuthor
>;

export const useGetCoursesQuery = () => {
  const { api, axios } = useApiClient();

  return useQuery(['courses'], async () => {
    const courses = await api<PageableResponse<CourseWithUnitsCountAndAuthor>>(
      axios.get('/courses'),
    );

    return courses;
  });
};

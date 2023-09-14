import { useGetCoursesQuery } from '../api';
import { CourseShowcaseList } from './CourseShowcaseList';

export const CourseShowCaseSection = () => {
  const { data } = useGetCoursesQuery({ getCoursesDTO: {} });

  return (
    <div className="mt-8">
      <h3 className="font-heading text-xl font-semibold">
        Nih, course recommended buat lo!
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        <CourseShowcaseList courses={data?.data?.records || []} />
      </div>
    </div>
  );
};

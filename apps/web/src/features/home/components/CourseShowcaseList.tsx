import { CourseCard } from '~/features/course';
import { CourseWithUnitsCountAndAuthor } from '../api';

interface CourseShowcaseListProps {
  courses: CourseWithUnitsCountAndAuthor[];
}

export const CourseShowcaseList: React.FC<CourseShowcaseListProps> = ({
  courses,
}) => {
  if (!courses.length) return null;

  return courses.map((course) => {
    return (
      <CourseCard
        author={course.author?.id.toString() || ''}
        coverImageUrl={course.thumbnailUrl || ''}
        createdDate={course.createdAt}
        title={course.name}
        unitCount={course._count.units}
      />
    );
  });
};

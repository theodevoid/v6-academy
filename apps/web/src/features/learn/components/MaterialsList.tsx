import { CourseDetails } from '~/features/course';
import { MaterialsListItem } from '..';

interface MaterialsListProps {
  units: CourseDetails['units'];
}

export const MaterialsList: React.FC<MaterialsListProps> = ({ units }) => {
  if (!units.length) return null;

  return units.map((unit) => {
    return (
      <MaterialsListItem
        title={unit.title}
        topicCount={unit.topics.length}
        topics={unit.topics}
      />
    );
  });
};

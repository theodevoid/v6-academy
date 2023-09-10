import { RoadmapListItem } from '..';

interface RoadmapListSectionProps {
  items: string[];
}

export const RoadmapListSection: React.FC<RoadmapListSectionProps> = ({
  items,
}) => {
  if (!items.length) return null;

  return items.map((item, idx) => {
    return <RoadmapListItem order={idx + 1} title={item} />;
  });
};

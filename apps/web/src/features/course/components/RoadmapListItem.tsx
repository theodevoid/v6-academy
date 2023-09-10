import { ArrowDownIcon } from '@radix-ui/react-icons';

interface RoadmapListItemProps {
  order: number;
  title: string;
}

export const RoadmapListItem: React.FC<RoadmapListItemProps> = ({
  order,
  title,
}) => {
  return (
    <div className="relative flex justify-start rounded bg-gray-800 p-2 text-lg text-primary-foreground dark:text-primary">
      <p className="mr-2 font-bold text-cyan-400">
        {order < 10 && '0'}
        {order}
      </p>{' '}
      <span className="line-clamp-1">{title}</span>
    </div>
  );
};

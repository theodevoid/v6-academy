import Link from 'next/link';
import { FileTextIcon, PlayIcon } from '@radix-ui/react-icons';
import { TopicType } from '@v6-academy/db';

interface MaterialsListItemTopicProps {
  id: number;
  title: string;
  type: TopicType;
}

export const MaterialsListItemTopic: React.FC<MaterialsListItemTopicProps> = ({
  title,
  id,
  type,
}) => {
  return (
    <Link href={`/learn/${id}`}>
      <div className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-200 dark:hover:bg-gray-900">
        <p>{title}</p>
        {type === 'TEXT' ? <FileTextIcon /> : <PlayIcon />}
      </div>
    </Link>
  );
};

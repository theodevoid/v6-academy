import Link from 'next/link';
import { FileTextIcon, PlayIcon } from '@radix-ui/react-icons';
import { TopicType } from '@v6-academy/db';

interface MaterialsListItemTopicProps {
  slug: string;
  title: string;
  type: TopicType;
}

export const MaterialsListItemTopic: React.FC<MaterialsListItemTopicProps> = ({
  title,
  slug,
  type,
}) => {
  return (
    <Link href={`/slug/${slug}`}>
      <div className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-slate-800">
        <p>{title}</p>
        {type === 'TEXT' ? <FileTextIcon /> : <PlayIcon />}
      </div>
    </Link>
  );
};

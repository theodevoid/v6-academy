import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import { toRupiah } from '~/utils/format';
import { AspectRatio } from '~/components/ui/aspect-ratio';

interface CourseCardProps {
  title: string;
  author: string;
  unitCount: number;
  createdDate: Date;
  price?: number;
  coverImageUrl: string;
  slug: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  author,
  unitCount,
  createdDate,
  price,
  coverImageUrl,
  slug,
}) => {
  return (
    <Link
      href={`/learn/course/${slug}`}
      className="w-full hover:cursor-pointer"
    >
      <AspectRatio ratio={16 / 9} className="relative">
        <Image fill src={coverImageUrl} alt={title} className="rounded-md" />
      </AspectRatio>
      <p className="mt-1.5 font-semibold">{title}</p>
      <p className="text-sm font-semibold text-muted-foreground">{author}</p>
      <p className="text-sm text-muted-foreground">
        {unitCount} Unit{unitCount > 1 && 's'} •{' '}
        {format(new Date(createdDate), 'MMMM yyyy')}
      </p>
      <p className="font-semibold">{price ? toRupiah(price) : 'FREE'}</p>
    </Link>
  );
};

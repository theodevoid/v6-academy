import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Topic } from '@v6-academy/db';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';
import { MaterialsListItemTopic } from './MaterialsListItemTopic';

interface MaterialsListItemProps {
  title: string;
  topicCount: number;
  topics: Topic[];
}

export const MaterialsListItem: React.FC<MaterialsListItemProps> = ({
  title,
  topicCount,
  topics,
}) => {
  const [opened, setOpened] = useState<boolean>(false);

  const toggleCollapsible = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <Collapsible open={opened}>
      <CollapsibleTrigger
        onClick={toggleCollapsible}
        className="flex w-full items-center justify-between rounded-t-sm bg-foreground p-4 text-background"
      >
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-left text-sm">
            {topicCount} Topic{topicCount > 1 && 's'}
          </p>
        </div>
        <ChevronDownIcon className={`${opened && 'rotate-180'} transition`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="text-sm">
        <MaterialsListItemTopic
          courseSlug="course-slug"
          slug="test-slug-var"
          title="Using the `var` keyword"
          type="VIDEO"
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

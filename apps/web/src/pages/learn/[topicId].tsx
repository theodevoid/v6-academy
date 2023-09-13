import { useRef } from 'react';
import { useRouter } from 'next/router';

import { HeadMetaData } from '~/components/HeadMetaData';
import { ScrollArea } from '~/components/ui/scroll-area';
import { useGetCourseQuery } from '~/features/course';
import {
  MaterialsList,
  ScrollToCourseUnitsButton,
  TopicContents,
  useGetTopicQuery,
} from '~/features/learn';

const LearnPage = () => {
  const router = useRouter();
  const courseUnitsDropdownsRef = useRef<HTMLDivElement>(null);

  const { data: topic } = useGetTopicQuery({
    config: {
      enabled: !!router.query.topicId,
    },
    id: parseInt(router.query.topicId?.toString() || '0'),
  });

  const { data: course } = useGetCourseQuery({
    config: {
      enabled: !!topic?.data.unit?.courseId,
    },
    courseId: parseInt(topic?.data.unit?.courseId.toString() || '0'),
  });

  return (
    <>
      <HeadMetaData title={topic?.data.title || ''} />
      <main className="flex min-h-screen flex-col lg:container lg:flex-row lg:gap-8">
        <aside
          ref={courseUnitsDropdownsRef}
          id="course-units-dropdowns"
          className="left-0 top-20 order-2 h-[75vh] min-w-[300px] px-8 lg:sticky lg:order-1 lg:px-0"
        >
          <h3 className="mb-2 font-heading text-xl font-semibold">
            Course Units
          </h3>
          <ScrollArea className="h-[75vh]">
            <MaterialsList units={course?.data.units || []} />
          </ScrollArea>
        </aside>
        <div className="lg:order2 order-1 mb-6 lg:flex-1">
          {!!topic?.data && <TopicContents topic={topic.data} />}
        </div>
        <ScrollToCourseUnitsButton targetRef={courseUnitsDropdownsRef} />
      </main>
    </>
  );
};

export default LearnPage;

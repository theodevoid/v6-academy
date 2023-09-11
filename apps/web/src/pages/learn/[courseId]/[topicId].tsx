import Head from 'next/head';
import { useRouter } from 'next/router';

import { HeadMetaData } from '~/components/HeadMetaData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { VideoPlayer } from '~/components/VideoPlayer';
import { MaterialsListItem, useGetTopicQuery } from '~/features/learn';

const LearnPage = () => {
  const router = useRouter();

  const { data: topic } = useGetTopicQuery({
    config: {
      enabled: !!router.query.topicId,
    },
    id: parseInt(router.query.topicId?.toString() || '0'),
  });

  return (
    <>
      <HeadMetaData title={topic?.data.title || ''} />
      <main className="min-h-screen">
        {/* ----- Video Container */}
        <div className="flex w-full flex-row justify-center">
          <div className="relative flex h-full w-full max-w-screen-lg">
            <VideoPlayer url={topic?.data.videoUrl || ''} />
          </div>
        </div>
        {/* ----- */}
        <Tabs className="mt-4 px-4" defaultValue="lectures">
          <TabsList className="flex w-full">
            <TabsTrigger className="flex-1" value="lectures">
              Materi Lainnya
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="assignments">
              Tugas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="lectures">
            <MaterialsListItem
              title="Variables and data types"
              topicCount={1}
            />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default LearnPage;

import Head from 'next/head';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { VideoPlayer } from '~/components/VideoPlayer';
import { MaterialsListItem } from '~/features/learn';

const LearnPage = () => {
  return (
    <main className="min-h-screen">
      <Head>
        <title>Ini adalah judul topik | V6 Academy</title>
      </Head>
      {/* ----- Video Container */}
      <div className="flex w-full flex-row justify-center">
        <div className="relative flex h-full w-full max-w-screen-lg">
          <VideoPlayer />
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
          <MaterialsListItem title="Variables and data types" topicCount={1} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default LearnPage;

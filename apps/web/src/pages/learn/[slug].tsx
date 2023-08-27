import Head from 'next/head';

import { VideoPlayer } from '~/components/VideoPlayer';

const LearnPage = () => {
  return (
    <main className="min-h-screen">
      <Head>
        <title>Ini adalah judul topik | V6 Academy</title>
      </Head>
      <div className="flex w-full flex-row justify-center">
        <div className="relative flex h-full w-full max-w-screen-lg">
          <VideoPlayer />
        </div>
      </div>
    </main>
  );
};

export default LearnPage;

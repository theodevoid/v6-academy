import { VideoPlayer } from '~/components/VideoPlayer';
import { parseMarkdownToHTML } from '~/lib/remark';
import { TopicDetails } from '..';

interface TopicContentsProps {
  topic: TopicDetails;
}

export const TopicContents: React.FC<TopicContentsProps> = ({ topic }) => {
  return (
    <>
      <div className="mb-4 flex w-full flex-row justify-center">
        <div className="relative flex h-full w-full max-w-screen-lg">
          <VideoPlayer url={topic.videoUrl || ''} />
        </div>
      </div>
      <div className="container flex flex-col lg:p-0">
        <h2 className="mb-2 font-heading text-xl font-semibold">
          {topic.unit?.order}. {topic.unit?.title}
        </h2>
        <h1 className="mb-4 border-b-2 border-dashed pb-4 font-heading text-3xl font-semibold text-cyan-500 dark:text-cyan-400">
          {topic.order}. {topic.title}
        </h1>
        <div
          className="prose dark:prose-invert border-b-2 border-dashed pb-4"
          dangerouslySetInnerHTML={{
            __html: parseMarkdownToHTML(
              topic.writtenMaterialMarkdown ||
                'Materi tertulis tidak tersedia..',
            ) as string | TrustedHTML,
          }}
        />
      </div>
    </>
  );
};

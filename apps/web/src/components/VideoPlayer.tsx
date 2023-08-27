import dynamic from 'next/dynamic';
import { ReactPlayerProps } from 'react-player/types';

import { AspectRatio } from './ui/aspect-ratio';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const hardcodedUrl =
  'https://www.youtube.com/watch?v=zGv-0J-AWyI&t=37s&ab_channel=VoidFnc';

interface VideoPlayerProps extends ReactPlayerProps {}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ ...props }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <ReactPlayer url={hardcodedUrl} width="100%" height="100%" {...props} />
    </AspectRatio>
  );
};

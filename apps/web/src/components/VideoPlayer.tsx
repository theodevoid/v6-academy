import dynamic from 'next/dynamic';
import { ReactPlayerProps } from 'react-player/types';

import { AspectRatio } from './ui/aspect-ratio';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface VideoPlayerProps extends ReactPlayerProps {}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ ...props }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <ReactPlayer url={props.url} width="100%" height="100%" {...props} />
    </AspectRatio>
  );
};

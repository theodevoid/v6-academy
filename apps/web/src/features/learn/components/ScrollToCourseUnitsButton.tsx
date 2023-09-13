import { ChevronDownIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';

interface ScrollToCourseUnitsButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export const ScrollToCourseUnitsButton: React.FC<
  ScrollToCourseUnitsButtonProps
> = ({ targetRef }) => {
  const scrollToCourseUnits = () => {
    targetRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Button
      onClick={scrollToCourseUnits}
      className="fixed bottom-8 right-8 rounded-full lg:hidden "
    >
      <>
        Course Units
        <ChevronDownIcon className="ml-2 h-[20px] w-[20px]" />
      </>
    </Button>
  );
};

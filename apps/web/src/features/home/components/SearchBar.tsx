import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export const SearchBar = () => {
  return (
    <div>
      <div className="flex">
        <Button variant="link" className="mr-4 font-extrabold font-heading">
          V6 Academy
        </Button>
        <Input className=" rounded-e-none px-6" />
        <Button className=" rounded-s-none ">
          <MagnifyingGlassIcon height={20} width={20} />
        </Button>
      </div>
    </div>
  );
};

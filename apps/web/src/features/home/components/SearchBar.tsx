import { MagnifyingGlassIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

export const SearchBar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      return;
    }

    setTheme('light');
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button variant="link" className="font-heading font-extrabold">
          V6 Academy
        </Button>
        <div className="flex flex-1">
          <Input className=" rounded-e-none px-6" />
          <Button className=" rounded-s-none">
            <MagnifyingGlassIcon height={20} width={20} />
          </Button>
        </div>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </div>
  );
};

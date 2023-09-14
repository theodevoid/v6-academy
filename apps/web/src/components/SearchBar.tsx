import Link from 'next/link';
import { MagnifyingGlassIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '~/components/ui/button';

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
    <div className="mb-20 flex justify-between px-4">
      <Button variant="link" className="font-heading font-extrabold">
        <Link href="/">V6 Academy</Link>
      </Button>
      <div className="flex gap-2">
        <Button>
          <MagnifyingGlassIcon height={20} width={20} />
        </Button>
        <Button onClick={toggleTheme}>
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
    </div>
  );
};

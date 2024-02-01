import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/app/providers/Theme';
import { Button } from '@/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';

const ThemeDropdown = () => {
  const { t } = useTranslation('auth');

  const { rawTheme, setTheme, themes } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="size-5 dark:hidden" />
          <Moon className="hidden size-5 dark:block" />
          <span className="sr-only">{t('header.chooseTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={rawTheme} onValueChange={setTheme}>
          {themes.map(({ value, label }) => (
            <DropdownMenuRadioItem value={value} key={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeDropdown;

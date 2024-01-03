import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

import { useLanguage, LANGUAGES_CONFIG } from '@/i18n';
import { Button } from '@/common/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';

const LanguageDropdown = () => {
  const { t } = useTranslation();

  const [{ code }, setLanguage] = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t('auth:header.chooseLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={code} onValueChange={setLanguage}>
          {Object.values(LANGUAGES_CONFIG).map(({ code, name }) => (
            <DropdownMenuRadioItem value={code} key={code}>
              {name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;

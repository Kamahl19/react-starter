import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useLanguage, LANGUAGES_CONFIG } from '@/i18n';
import { useTheme } from '@/app/providers/Theme';
import { useSignOut } from '@/common/auth';
import { Typography } from '@/common/components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/common/components/ui/avatar';

import { DASHBOARD_ROUTES } from '../../routes';

type Props = {
  email: string;
};

const UserDropdown = ({ email }: Props) => {
  const { t } = useTranslation('dashboard');

  const { signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2">
          <Avatar className="size-8">
            <AvatarFallback>{email.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <Typography variant="smallText">{email}</Typography>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={DASHBOARD_ROUTES.profile.to}>{t('header.profile')}</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <LanguageDropdown />
          <ThemeDropdown />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={signOut}>{t('header.signOut')}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;

const LanguageDropdown = () => {
  const { t } = useTranslation('dashboard');

  const [{ code }, setLanguage] = useLanguage();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t('header.language')}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={code} onValueChange={setLanguage}>
            {Object.values(LANGUAGES_CONFIG).map(({ code, name }) => (
              <DropdownMenuRadioItem value={code} key={code}>
                {name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

const ThemeDropdown = () => {
  const { t } = useTranslation('dashboard');

  const { rawTheme, setTheme, themes } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>{t('header.theme')}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={rawTheme} onValueChange={setTheme}>
            {themes.map(({ value, label }) => (
              <DropdownMenuRadioItem value={value} key={value}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};

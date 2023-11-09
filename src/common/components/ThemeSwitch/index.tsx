import { Switch, type SwitchProps } from 'antd';
import { useTranslation } from 'react-i18next';

import { useTheme, Theme } from '@/app/theme';

const ThemeSwitch = (props: SwitchProps) => {
  const { t } = useTranslation();
  const [theme, setTheme] = useTheme();

  return (
    <Switch
      checked={theme === Theme.DARK}
      onChange={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}
      checkedChildren={<>{t('common:themeSwitch.dark')}</>}
      unCheckedChildren={<>{t('common:themeSwitch.light')}</>}
      {...props}
    />
  );
};

export default ThemeSwitch;

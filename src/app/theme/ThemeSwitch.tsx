import { Switch, type SwitchProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import { isDarkState } from './ThemeProvider';

const ThemeSwitch = (props: SwitchProps) => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  return (
    <Switch
      checked={isDark}
      onChange={() => setIsDark(!isDark)}
      checkedChildren={<>{t('common:theme.dark')}</>}
      unCheckedChildren={<>{t('common:theme.light')}</>}
      {...props}
    />
  );
};

export default ThemeSwitch;

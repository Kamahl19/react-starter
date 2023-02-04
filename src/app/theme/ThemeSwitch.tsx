import { Switch, type SwitchProps } from 'antd';
import { useRecoilState } from 'recoil';

import { isDarkState } from './ThemeProvider';

const ThemeSwitch = (props: SwitchProps) => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  return (
    <Switch
      checked={isDark}
      onChange={() => setIsDark(!isDark)}
      checkedChildren="🌜"
      unCheckedChildren="🌞"
      {...props}
    />
  );
};

export default ThemeSwitch;

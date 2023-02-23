import { Select, type SelectProps } from 'antd';

import { useCurrentLanguage, LANGUAGES_CONFIG } from 'i18n';

const options = Object.entries(LANGUAGES_CONFIG).map(([value, { name, flag }]) => ({
  value,
  label: `${flag} ${name}`,
}));

const LanguageSwitch = (props: SelectProps) => {
  const [language, setLanguage] = useCurrentLanguage();

  return (
    <Select size="small" {...props} onChange={setLanguage} options={options} value={language} />
  );
};

export default LanguageSwitch;

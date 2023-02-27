import { useCallback, useMemo } from 'react';
import { css } from '@emotion/react';
import { Space } from 'antd';

import { useCurrentLanguage, LANGUAGES_CONFIG, resolveLanguage } from 'i18n';
import { createStyles } from 'common/styleUtils';
import { NavbarDropdown } from 'common/components';

const LanguageSelector = () => {
  const [language, setLanguage] = useCurrentLanguage();

  const items = useMemo(
    () =>
      Object.entries(LANGUAGES_CONFIG).map(([value, { name, flag }]) => ({
        key: value,
        label: (
          <Space>
            <span css={styles.flag}>{flag}</span> {name}
          </Space>
        ),
      })),
    []
  );

  const handleClick = useCallback(
    ({ key }: { key: string }) => {
      setLanguage(resolveLanguage(key));
    },
    [setLanguage]
  );

  return (
    <NavbarDropdown menu={{ items, onClick: handleClick }}>
      <span role="img" aria-label={language.name} css={styles.flag}>
        {language.flag}
      </span>
    </NavbarDropdown>
  );
};

export default LanguageSelector;

const styles = createStyles({
  flag: ({ token }) =>
    css({
      fontSize: token.fontSizeXL,
      verticalAlign: 'middle',
      lineHeight: 1,
    }),
});

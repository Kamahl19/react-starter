import { useTranslation } from 'react-i18next';
import { Button, Card, Result, type ResultProps } from 'antd';

import { isApiError } from 'api';
import { centeredCss, fullVPHeightCss } from 'common/styleUtils';

type Props = ResultProps & {
  onReset?: VoidFunction;
  error?: unknown;
  card?: boolean;
  fullVPHeight?: boolean;
};

const ResultError = ({ onReset, error, card, fullVPHeight, ...props }: Props) => {
  const { t } = useTranslation();

  const subTitle = error instanceof Error || isApiError(error) ? error.message : undefined;

  const status = isApiError(error) && isExceptionStatusType(error.status) ? error.status : 'error';

  const Content = (
    <Result
      css={[centeredCss, fullVPHeight && fullVPHeightCss]}
      status={status}
      title={t('common:resultError.title')}
      subTitle={subTitle}
      extra={
        onReset ? (
          <Button type="primary" onClick={onReset}>
            {t('common:resultError.retry')}
          </Button>
        ) : undefined
      }
      {...props}
    />
  );

  if (card) {
    return <Card bordered={false}>{Content}</Card>;
  }

  return Content;
};

export default ResultError;

const isExceptionStatusType = (status: number): status is 403 | 404 | 500 =>
  [403, 404, 500].includes(status);

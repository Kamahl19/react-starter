import { useTranslation } from 'react-i18next';

type Props = {
  onReset?: VoidFunction;
  error?: unknown;
  fullVPHeight?: boolean;
};

const ResultError = ({ onReset, error, fullVPHeight }: Props) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'grid',
        placeContent: 'center',
        height: '100%',
        ...(fullVPHeight ? { height: '100vh' } : {}),
      }}
    >
      <h3>{t('common:resultError.title')}</h3>
      <h4>
        {typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string'
          ? error.message
          : typeof error === 'string'
            ? error
            : undefined}
      </h4>
      {onReset && <button onClick={onReset}>{t('common:resultError.retry')}</button>}
    </div>
  );
};

export default ResultError;

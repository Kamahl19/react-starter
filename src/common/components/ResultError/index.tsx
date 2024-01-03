import { useTranslation } from 'react-i18next';

import { Button } from '@/common/components/ui/button';
import { Typography } from '@/common/components';
import { cn } from '@/common/styleUtils';

type Props = {
  onReset?: VoidFunction;
  error?: unknown;
  className?: string;
};

const ResultError = ({ onReset, error, className }: Props) => {
  const { t } = useTranslation();

  const message =
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message !== ''
      ? error.message
      : typeof error === 'string'
        ? error
        : undefined;

  return (
    <div className={cn('flex h-full items-center justify-center', className)}>
      <div>
        <Typography variant="h2">{t('common:resultError.title')}</Typography>
        <Typography variant="p">{t('common:resultError.description')}</Typography>
        {message && <Typography variant="blockquote">{message}</Typography>}
        {onReset && (
          <Button onClick={onReset} className="mt-7">
            {t('common:resultError.reload')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultError;

import { useTranslation } from 'react-i18next';

import { Typography } from '@/common/components';
import { Separator } from '@/common/components/ui/separator';

const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-x-6 gap-y-2 sm:flex-row">
        <Typography variant="h4">{t('notFound.title')}</Typography>
        <Separator orientation="vertical" className="hidden h-10 sm:block" />
        <Typography variant="regularText">{t('notFound.subtitle')}</Typography>
      </div>
    </div>
  );
};

export default NotFound;

import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

import { Typography } from '@/common/components';

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full items-center justify-center gap-x-2">
      <Loader2 className="size-4 animate-spin" />
      <Typography variant="mutedText">{t('common:loading')}</Typography>
    </div>
  );
};

export default Loading;

import { type ReactNode } from 'react';

import { Typography } from '@/common/components';

type Props = {
  title: ReactNode;
  description: ReactNode;
};

const Success = ({ title, description }: Props) => (
  <div className="flex h-full justify-center">
    <div className="space-y-3">
      <Typography variant="h3">{title}</Typography>
      <Typography variant="lead">{description}</Typography>
    </div>
  </div>
);

export default Success;

import { type ReactNode } from 'react';

import { Typography } from '@/common/components';

type Props = {
  title: ReactNode;
  children: ReactNode;
};

const FormWrapper = ({ title, children }: Props) => (
  <div className="m-auto flex w-full max-w-[350px] flex-col gap-6">
    <Typography variant="h3">{title}</Typography>
    <div>{children}</div>
  </div>
);

export default FormWrapper;

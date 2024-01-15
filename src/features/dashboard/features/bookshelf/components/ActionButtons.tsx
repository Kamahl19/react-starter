import { type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { BookCheck, BookMinus, BookPlus, BookX } from 'lucide-react';

import { useAddToReadingList, useRemoveFromReadingList, useMarkBook } from '@/api';
import { useAuth } from '@/common/auth';
import { usePrintErrorMessage } from '@/common/hooks';
import { Button, type ButtonProps } from '@/common/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/common/components/ui/tooltip';

const ActionButton = ({
  isPending,
  icon,
  label,
  onClick,
  variant,
}: {
  isPending: boolean;
  icon: ReactNode;
  label: ReactNode;
  onClick: VoidFunction;
  variant?: ButtonProps['variant'];
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant={variant} size="icon" disabled={isPending} onClick={onClick}>
        {icon}
        <span className="sr-only">{label}</span>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);

export const AddToReadingListButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const onError = usePrintErrorMessage();
  const { mutate, isPending } = useAddToReadingList();

  return (
    <ActionButton
      isPending={isPending}
      icon={<BookPlus className="size-5" />}
      label={t('bookshelf:action.addToReadingList')}
      onClick={() => mutate({ bookId, userId }, { onError })}
    />
  );
};

export const RemoveFromReadingListButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const onError = usePrintErrorMessage();
  const { mutate, isPending } = useRemoveFromReadingList();

  return (
    <ActionButton
      variant="destructive"
      isPending={isPending}
      icon={<BookMinus className="size-5" />}
      label={t('bookshelf:action.removeFromReadingList')}
      onClick={() => mutate({ bookId, userId }, { onError })}
    />
  );
};

export const MarkAsReadButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const onError = usePrintErrorMessage();
  const { mutate, isPending } = useMarkBook();

  return (
    <ActionButton
      isPending={isPending}
      icon={<BookCheck className="size-5" />}
      label={t('bookshelf:action.markAsRead')}
      onClick={() => mutate({ bookId, userId, finished: true }, { onError })}
    />
  );
};

export const MarkAsUnreadButton = ({ bookId }: { bookId: string }) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const onError = usePrintErrorMessage();
  const { mutate, isPending } = useMarkBook();

  return (
    <ActionButton
      isPending={isPending}
      icon={<BookX className="size-5" />}
      label={t('bookshelf:action.markAsUnread')}
      onClick={() => mutate({ bookId, userId, finished: false }, { onError })}
    />
  );
};

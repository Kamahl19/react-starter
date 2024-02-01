import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';

import { useSetRating } from '@/api';
import { useAuth } from '@/common/auth';
import { useShowErrorMessage } from '@/common/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';

const RatingSelect = ({ bookId, value }: { bookId: string; value: number }) => {
  const { t } = useTranslation('bookshelf');
  const onError = useShowErrorMessage();
  const { userId } = useAuth();
  const { mutate } = useSetRating();

  return (
    <Select
      onValueChange={(value: string) =>
        mutate({ bookId, userId, rating: Number.parseInt(value) }, { onError })
      }
      value={value === 0 ? undefined : `${value}`}
    >
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder={t('ratingSelect.label')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">
          <div className="flex">
            <Star />
          </div>
        </SelectItem>
        <SelectItem value="2">
          <div className="flex">
            <Star />
            <Star />
          </div>
        </SelectItem>
        <SelectItem value="3">
          <div className="flex">
            <Star />
            <Star />
            <Star />
          </div>
        </SelectItem>
        <SelectItem value="4">
          <div className="flex">
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </SelectItem>
        <SelectItem value="5">
          <div className="flex">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RatingSelect;

import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export function formatDate(date: Date | string, pattern: string) {
  return format(date, pattern, { locale: zhTW });
};

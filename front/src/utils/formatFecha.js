import { format } from 'date-fns';
import es from 'date-fns/locale/es';
export const formatFecha = (date) => {
    if (date) {
      return format(date, 'dd/MM/yyyy', { locale: es });
    }
    return '';
  };
import {ValidationErrors, ValidatorFn} from '@angular/forms';

export function timeUnder1HourValidator(): ValidatorFn {
  return (control): ValidationErrors | null => {
    const ms = typeof control.value === 'number' ? control.value : 0;

    return ms >= 3600000 ? { over1Hour: true } : null;
  };
}

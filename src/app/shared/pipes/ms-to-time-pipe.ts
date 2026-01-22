import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToTime',
})
export class MsToTimePipe implements PipeTransform {
  transform(timeMs: number | null | undefined): string {
    if (!timeMs || timeMs <= 0) return '00:00.000';
    const totalSeconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = timeMs % 1000;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  }
}

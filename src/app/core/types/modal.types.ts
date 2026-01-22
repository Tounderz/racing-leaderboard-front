import {Type} from '@angular/core';
import {NewRacerModal} from '../components/modals/new-racer-modal/new-racer-modal';

export type ModalComponentType = NewRacerModal

export type ModalConfig = {
  component: Type<ModalComponentType>;
  data?: unknown;
  title?: string;
  width?: number;
}

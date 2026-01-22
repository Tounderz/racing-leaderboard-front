import {Component, inject} from '@angular/core';
import {Button} from '../../../shared/components/ui/button/button';
import {ModalService} from '../../services/modal.service';
import {NewRacerModal} from '../modals/new-racer-modal/new-racer-modal';

@Component({
  selector: 'header[app-header]',
  imports: [
    Button
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private modalService: ModalService = inject(ModalService);

  public openNewRacerModal(): void {
    this.modalService.open({
      component: NewRacerModal,
      title: 'Новый гонщик',
      data: { racer: { name: '', team: '' } },
      width: 350,
    });
  }
}

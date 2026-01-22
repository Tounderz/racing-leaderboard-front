import {Component, inject} from '@angular/core';
import {BaseModal} from '../base-modal/base-modal';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Input} from '../../../../shared/components/ui/input/input';
import {Button} from '../../../../shared/components/ui/button/button';
import {newRacerFormFields} from './configs/new-racer-modal-config';
import {Select} from '../../../../shared/components/ui/select/select';
import {colorSelectData} from '../../../models/color-select-data';
import {SelectData} from '../../../types/select-data.types';
import {LeaderboardService} from '../../../services/leaderboard.service';

@Component({
  selector: 'app-new-racer-modal',
  imports: [
    ReactiveFormsModule,
    Input,
    Button,
    Select
  ],
  templateUrl: './new-racer-modal.html',
  styleUrl: './new-racer-modal.scss',
})
export class NewRacerModal extends BaseModal {
  private leaderboardService: LeaderboardService = inject(LeaderboardService);

  public readonly newRacerFormFields = newRacerFormFields;
  public readonly colorSelectData = colorSelectData;
  public newRacerForm: FormGroup = new FormGroup({});

  public override ngOnInit(): void {
    this.newRacerForm = this.initForm(this.newRacerFormFields);
  }

  public isFieldErrors(key: string): boolean {
    const control = this.newRacerForm.get(key);

    return !!((control?.touched || control?.dirty) && control?.invalid || control?.errors);
  }

  public valueInputChange(value: string, key: string): void {
    if (key === 'time') {
      const msValue = this.timeToMilliseconds(value);
      this.newRacerForm.get(key)?.setValue(msValue);
    } else {
      this.newRacerForm.get(key)?.setValue(value);
    }
  }

  public valueSelectChange(value: SelectData, key: string): void {
    this.newRacerForm.get(key)?.setValue(value.name);
  }

  public handleSave(): void {
    this.leaderboardService.addUser(this.newRacerForm.value);
    this.closeModal();
    this.toasterState.showToast({
      message: 'Запись добавлена',
      type: 'success',
      duration: 2000
    });
  }

  private timeToMilliseconds(time: string): number {
    const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map(Number);
    const [secInt = 0, ms = 0] = (seconds || 0).toString().split('.').map(Number);

    return (minutes * 60000) + (secInt * 1000) + ms;
  }
}

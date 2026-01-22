import {ChangeDetectionStrategy, Component, EventEmitter, input, Output, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {InputType} from '../../../../core/types/form-field.typs';

@Component({
  selector: 'app-input',
  imports: [
    FormsModule
  ],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input {
  label = input<string>('');
  value = input<string | number>('');
  inputType = input<InputType>('text');
  isErrorValid = input<boolean>(false);
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  public handleChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}

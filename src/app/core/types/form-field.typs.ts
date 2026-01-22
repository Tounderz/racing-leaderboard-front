import {Validators} from '@angular/forms';

export type FormFieldConfig = {
  key: string;
  label: string;
  type: FormFieldConfigType;
  inputType?: InputType;
  validators?: Validators
}

export type FormFieldConfigType = 'input' | 'select' | 'date';

export type InputType = 'text' | 'number' | 'password' | 'time';

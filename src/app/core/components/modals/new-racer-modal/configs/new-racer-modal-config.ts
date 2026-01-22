import {FormFieldConfig} from '../../../../types/form-field.typs';
import {Validators} from '@angular/forms';
import {timeUnder1HourValidator} from '../../../../validators/time.validators';

export const newRacerFormFields: Array<FormFieldConfig> = [
  {
    label: 'Имя',
    key: 'name',
    type: 'input',
    inputType: 'text',
    validators: [Validators.required]
  },
  {
    label: 'Скорость',
    key: 'speed',
    type: 'input',
    inputType: 'number',
    validators: [Validators.required]
  },
  {
    label: 'Время',
    key: 'time',
    type: 'input',
    inputType: 'time',
    validators: [
      Validators.required,
      timeUnder1HourValidator()
    ]
  },
  {
    label: 'Цвет шлема',
    key: 'color',
    type: 'select',
    validators: [Validators.required]
  },
]

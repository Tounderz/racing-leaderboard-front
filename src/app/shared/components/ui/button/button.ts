import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {BtnVariant} from './types/button.types';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  variant = input<BtnVariant>('primary');
  icon = input<string>();
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  @Output() handleBtnClick: EventEmitter<void> = new EventEmitter<void>();

  public readonly btnClasses = computed(() => {
    const modifiers = [
      this.fullWidth() && 'btn-full-width',
      this.disabled() && 'btn-disabled'
    ].filter(Boolean).join(' ');

    return `btn btn-${this.variant()} ${modifiers}`;
  });

  public handleClick(): void {
    !this.disabled() && this.handleBtnClick.emit();
  }
}

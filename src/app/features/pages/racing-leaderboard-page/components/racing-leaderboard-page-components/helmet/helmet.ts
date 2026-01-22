import {Component, HostBinding, input} from '@angular/core';

@Component({
  selector: 'div[app-helmet]',
  standalone: false,
  templateUrl: './helmet.html',
  styleUrl: './helmet.scss',
})
export class Helmet {
  color = input<string>('#4444FF');
  @HostBinding('style.color') get style() { return this.color(); }
}

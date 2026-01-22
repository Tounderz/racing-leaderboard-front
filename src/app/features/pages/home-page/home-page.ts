import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../../../core/components/header/header';
import {BaseModal} from '../../../core/components/modals/base-modal/base-modal';
import {Toaster} from '../../../shared/components/ui/toaster/toaster';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterOutlet,
    Header,
    BaseModal,
    Toaster
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}

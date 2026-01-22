import { Routes } from '@angular/router';
import {LoginPage} from './features/pages/login-page/login-page';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: '',
    loadChildren: () => import('./features/pages/home-page/home-page-module').then(m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

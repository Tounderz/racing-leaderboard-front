import {Component, inject, signal} from '@angular/core';
import {Input} from '../../../shared/components/ui/input/input';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from '../../../shared/components/ui/button/button';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [
    Input,
    FormsModule,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public errorMessage = signal<string>('');
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  public valueChange(value: string, key: string): void {
    this.loginForm.get(key)?.setValue(value);
  }

  public  login(): void {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.errorMessage.set('');
      this.router.navigate(['/leaderboard']);
    } else {
      this.errorMessage.set('Ошибка авторизации');
      this.loginForm.reset();
    }
  }
}

import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = signal<boolean>(false);
  private readonly authKey: string = 'racing-auth';

  constructor() {
    this.checkAuth();
  }

  private checkAuth(): void {
    const authData = localStorage.getItem(this.authKey);
    this.isAuthenticated.set(!!authData);
  }

  public login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123') {
      localStorage.setItem(this.authKey, JSON.stringify({
        username,
        loggedIn: true,
        timestamp: Date.now()
      }));
      this.isAuthenticated.set(true);
      return true;
    }

    return false;
  }
}

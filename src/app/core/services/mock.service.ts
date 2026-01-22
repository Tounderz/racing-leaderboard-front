import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker/locale/ru';
import {User} from '../types/user.types';
import {Color} from '../types/color.types';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  public generateUsers(count: number): Array<User> {
    return Array.from({ length: count }, () => ({
      color: this.randomColor(),
      name: faker.person.fullName(),
      speed: Number((180 + Math.random() * 50).toFixed(1)),
      time: 85000 + Math.floor(Math.random() * 5000)
    })).sort((a, b) => a.time - b.time);
  }

  private randomColor(): Color {
    const colors: Array<Color> = ['Red', 'Green', 'Blue'];
    return colors[Math.floor(Math.random() * 3)]!;
  }
}

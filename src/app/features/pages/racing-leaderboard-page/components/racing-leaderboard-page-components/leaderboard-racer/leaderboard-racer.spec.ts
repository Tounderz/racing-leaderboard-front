import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardRacer } from './leaderboard-racer';

describe('LeaderboardRacer', () => {
  let component: LeaderboardRacer;
  let fixture: ComponentFixture<LeaderboardRacer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardRacer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardRacer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

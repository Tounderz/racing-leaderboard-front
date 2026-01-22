import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingLeaderboardPage } from './racing-leaderboard-page';

describe('RacingLeaderboardPage', () => {
  let component: RacingLeaderboardPage;
  let fixture: ComponentFixture<RacingLeaderboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacingLeaderboardPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacingLeaderboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

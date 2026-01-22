import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStatus } from './live-status';

describe('LiveStatus', () => {
  let component: LiveStatus;
  let fixture: ComponentFixture<LiveStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

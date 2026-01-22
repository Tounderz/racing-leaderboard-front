import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRacerModal } from './new-racer-modal';

describe('NewRacerModal', () => {
  let component: NewRacerModal;
  let fixture: ComponentFixture<NewRacerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRacerModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRacerModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

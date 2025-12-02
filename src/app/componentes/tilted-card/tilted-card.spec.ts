import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiltedCard } from './tilted-card';

describe('TiltedCard', () => {
  let component: TiltedCard;
  let fixture: ComponentFixture<TiltedCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiltedCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiltedCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaggeredMenu } from './staggered-menu';

describe('StaggeredMenu', () => {
  let component: StaggeredMenu;
  let fixture: ComponentFixture<StaggeredMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaggeredMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaggeredMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

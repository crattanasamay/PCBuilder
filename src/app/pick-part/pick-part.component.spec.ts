import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPartComponent } from './pick-part.component';

describe('PickPartComponent', () => {
  let component: PickPartComponent;
  let fixture: ComponentFixture<PickPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

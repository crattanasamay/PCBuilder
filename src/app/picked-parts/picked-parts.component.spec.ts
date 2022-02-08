import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickedPartsComponent } from './picked-parts.component';

describe('PickedPartsComponent', () => {
  let component: PickedPartsComponent;
  let fixture: ComponentFixture<PickedPartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickedPartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickedPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

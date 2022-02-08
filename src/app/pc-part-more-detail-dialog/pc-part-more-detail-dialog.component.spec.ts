import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcPartMoreDetailDialogComponent } from './pc-part-more-detail-dialog.component';

describe('PcPartMoreDetailDialogComponent', () => {
  let component: PcPartMoreDetailDialogComponent;
  let fixture: ComponentFixture<PcPartMoreDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcPartMoreDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcPartMoreDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

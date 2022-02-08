import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPcBuildTableComponent } from './saved-pc-build-table.component';

describe('SavedPcBuildTableComponent', () => {
  let component: SavedPcBuildTableComponent;
  let fixture: ComponentFixture<SavedPcBuildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPcBuildTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPcBuildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

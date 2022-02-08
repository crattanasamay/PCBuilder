import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPcComponent } from './build-pc.component';

describe('BuildPcComponent', () => {
  let component: BuildPcComponent;
  let fixture: ComponentFixture<BuildPcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildPcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

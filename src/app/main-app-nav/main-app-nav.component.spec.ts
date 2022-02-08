import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppNavComponent } from './main-app-nav.component';

describe('MainAppNavComponent', () => {
  let component: MainAppNavComponent;
  let fixture: ComponentFixture<MainAppNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAppNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAppNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

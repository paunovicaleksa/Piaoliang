import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgencyComponent } from './view-agency.component';

describe('ViewAgencyComponent', () => {
  let component: ViewAgencyComponent;
  let fixture: ComponentFixture<ViewAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

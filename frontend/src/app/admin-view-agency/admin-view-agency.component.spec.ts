import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAgencyComponent } from './admin-view-agency.component';

describe('AdminViewAgencyComponent', () => {
  let component: AdminViewAgencyComponent;
  let fixture: ComponentFixture<AdminViewAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewAgencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

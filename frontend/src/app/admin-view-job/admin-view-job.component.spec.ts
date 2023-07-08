import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewJobComponent } from './admin-view-job.component';

describe('AdminViewJobComponent', () => {
  let component: AdminViewJobComponent;
  let fixture: ComponentFixture<AdminViewJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

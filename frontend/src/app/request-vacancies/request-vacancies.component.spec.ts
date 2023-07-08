import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestVacanciesComponent } from './request-vacancies.component';

describe('RequestVacanciesComponent', () => {
  let component: RequestVacanciesComponent;
  let fixture: ComponentFixture<RequestVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestVacanciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
